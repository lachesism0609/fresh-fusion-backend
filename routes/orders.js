const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');
const { authenticateJWT, isAdmin } = require('../middleware/authMiddleware');

// Create new order
router.post('/', authenticateJWT, async (req, res) => {
  try {
    const { items, totalPrice, deliveryAddress, contactNumber } = req.body;
    
    // Verify stock availability
    for (let item of items) {
      const menuItem = await MenuItem.findById(item.menuItemId);
      if (!menuItem || menuItem.stock < item.quantity) {
        return res.status(400).json({ 
          error: `Insufficient stock for item: ${menuItem ? menuItem.title : 'Unknown item'}` 
        });
      }
    }

    // Update stock
    await Promise.all(items.map(item => 
      MenuItem.findByIdAndUpdate(item.menuItemId, {
        $inc: { stock: -item.quantity }
      })
    ));

    // Create order
    const order = new Order({
      userId: req.userId,
      items,
      totalPrice,
      deliveryAddress,
      contactNumber,
      status: 'pending'
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ error: 'Error creating order' });
  }
});

// Get user's orders
router.get('/my-orders', authenticateJWT, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId })
      .populate('items.menuItemId')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching orders' });
  }
});

// Get all orders (admin only)
router.get('/all', authenticateJWT, isAdmin, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('userId', 'username')
      .populate('items.menuItemId')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching orders' });
  }
});

// Update order status (admin only)
router.patch('/:orderId/status', authenticateJWT, isAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { status },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Error updating order status' });
  }
});

module.exports = router;
