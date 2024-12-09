const request = require('supertest');
const app = require('../../app');
const MenuItem = require('../../models/MenuItem');
const User = require('../../models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

describe('Menu API Endpoints', () => {
  let adminToken;
  let testMenuItem;

  beforeAll(async () => {
    await User.deleteMany({});
    
    // Create admin user directly in the database
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@test.com',
      username: 'admin',
      password: 'admin123',
      role: 'admin'
    });

    // Generate token directly
    adminToken = jwt.sign(
      { userId: adminUser._id, username: adminUser.username, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
  });

  beforeEach(async () => {
    await MenuItem.deleteMany({});
    testMenuItem = await MenuItem.create({
      title: 'Test Sushi',
      category: 'Sushi',
      price: 10.99,
      description: 'Test description',
      imageUrl: 'http://example.com/sushi.jpg',
      stock: 10
    });
  });

  afterEach(async () => {
    await MenuItem.deleteMany({});
  });

  describe('GET /api/menu', () => {
    it('should return all menu items', async () => {
      const res = await request(app).get('/api/menu');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.menuItems)).toBeTruthy();
    });

    it('should filter menu items by category', async () => {
      const res = await request(app)
        .get('/api/menu')
        .query({ category: 'Sushi' });
      expect(res.status).toBe(200);
      expect(res.body.menuItems[0].category).toBe('Sushi');
    });
  });

  describe('POST /api/menu/createMenu', () => {
    it('should create new menu item with admin token', async () => {
      const newItem = {
        title: 'New Sushi',
        category: 'Sushi',
        price: 12.99,
        description: 'New description',
        imageUrl: 'http://example.com/newsushi.jpg',
        stock: 20
      };

      const res = await request(app)
        .post('/api/menu/createMenu')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(newItem);

      expect(res.status).toBe(201);
      expect(res.body.menuItem.title).toBe(newItem.title);
    });
  });
});