const request = require('supertest');
const app = require('../../app');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');

describe('Authentication Security', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe('User Registration', () => {
    it('should hash password before saving', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@test.com',
        username: 'testuser',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(201);

      expect(response.body.token).toBeDefined();
      
      const user = await User.findOne({ username: 'testuser' });
      expect(user).not.toBeNull();
      expect(user.password).not.toBe('password123');
      expect(user.password).toMatch(/^\$2[aby]\$\d+\$/);
    });
  });

  describe('JWT Security', () => {
    it('should verify JWT token', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@test.com',
        username: 'testuser',
        password: 'password123'
      };

      // Register user first
      await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(201);

      // Then login
      const loginRes = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'testuser',
          password: 'password123'
        })
        .expect(200);

      expect(loginRes.body.token).toBeDefined();
      const decoded = jwt.verify(loginRes.body.token, process.env.JWT_SECRET);
      expect(decoded.username).toBe('testuser');
    });
  });
});