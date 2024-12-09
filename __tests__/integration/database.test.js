const mongoose = require('mongoose');
const MenuItem = require('../../models/MenuItem');
const Order = require('../../models/Order');
const User = require('../../models/User');

describe('Database Operations', () => {
  beforeEach(async () => {
    await mongoose.connection.dropDatabase();
  });

  describe('MenuItem Operations', () => {
    it('should create and retrieve menu item', async () => {
      const menuItem = await MenuItem.create({
        title: 'Test Sushi',
        category: 'Sushi',
        price: 10.99,
        stock: 10,
        description: 'Test description',
        imageUrl: 'http://example.com/sushi.jpg'
      });

      const found = await MenuItem.findById(menuItem._id);
      expect(found.title).toBe('Test Sushi');
    });

    it('should update stock level', async () => {
      const menuItem = await MenuItem.create({
        title: 'Test Sushi',
        category: 'Sushi',
        price: 10.99,
        stock: 10,
        description: 'Test description',
        imageUrl: 'http://example.com/sushi.jpg'
      });

      await MenuItem.findByIdAndUpdate(menuItem._id, { stock: 5 });
      const updated = await MenuItem.findById(menuItem._id);
      expect(updated.stock).toBe(5);
    });
  });

  describe('Order Operations', () => {
    it('should create order with menu items', async () => {
      const user = await User.create({
        name: 'Test User',
        email: 'test@test.com',
        username: 'testuser',
        password: 'password123'
      });

      const menuItem = await MenuItem.create({
        title: 'Test Sushi',
        category: 'Sushi',
        price: 10.99,
        stock: 10,
        description: 'Test description',
        imageUrl: 'http://example.com/sushi.jpg'
      });

      const order = await Order.create({
        userId: user._id,
        items: [{ menuItemId: menuItem._id, quantity: 2, price: 10.99 }],
        totalPrice: 21.98,
        status: 'pending',
        contactNumber: '1234567890',
        deliveryAddress: '123 Test St'
      });

      const found = await Order.findById(order._id).populate('items.menuItemId');
      expect(found.items[0].menuItemId.title).toBe('Test Sushi');
    });
  });
});