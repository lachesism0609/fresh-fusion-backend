require('dotenv').config();

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const { authenticateJWT , isAdmin} = require('../middleware/authMiddleware');

/**
 * User registration
 * POST /auth/register
 * @body {String} name - User's full name
 * @body {String} email - User's email
 * @body {String} username - User's username
 * @body {String} password - User's password
 * @returns {Object} User data and authentication token
 */
router.post('/register', async (req, res) => {
  try {
    const { name, email, username, password } = req.body;
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    
    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }

    const user = new User({ name, email, username, password });
    await user.save();

    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      token,
      username: user.username,
      role: user.role
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Registration failed' });
  }
});

/**
 * User login
 * POST /auth/login
 * @body {String} username - User's username
 * @body {String} password - User's password
 * @returns {Object} Authentication token and user info
 */
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      token,
      username: user.username,
      role: user.role
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Login failed' });
  }
});

/**
 * Get user profile
 * GET /auth/profile
 * Requires authentication
 * @returns {Object} User profile data
 */
router.get('/profile', authenticateJWT, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching profile' ,details:error.message});
  }
});

/**
 * Get user menu/orders
 * GET /auth/user/menu
 * Requires authentication
 */
router.get('/user/menu', authenticateJWT, async (req, res) => {
    try {
      const user = await User.findById(req.userId).populate('orders');
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
      res.status(200).json({ orders: user.orders });
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong',details:error.message });
    }
  });
  
/**
 * Delete user
 * DELETE /auth/user/:id
 * Requires admin authentication
 * @param {String} id - User ID to delete
 */
router.delete('/user/:id', authenticateJWT, isAdmin, async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
      await User.deleteOne({ _id: id });
      res.status(200).json({ msg: 'User deleted' });
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong',details:error.message  });
    }
  });

module.exports = router;
