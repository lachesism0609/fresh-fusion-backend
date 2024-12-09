const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');
const { authenticateJWT, isAdmin } = require('../middleware/authMiddleware');

/**
 * Get menu items with filters
 * GET /menu
 * @query {String} category - Filter by category
 * @query {String} search - Search in title and description
 * @query {Number} minPrice - Minimum price filter
 * @query {Number} maxPrice - Maximum price filter
 * @query {String} dietary - Comma-separated dietary flags
 * @query {Number} page - Page number for pagination
 * @query {Number} limit - Items per page
 */
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const query = category ? { category } : {};
    const menuItems = await MenuItem.find(query);
    res.json({ menuItems });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching menu items' });
  }
});

/**
 * Create new menu item
 * POST /menu/createMenu
 * Requires admin authentication
 * @body {String} title - Item title
 * @body {String} category - Item category
 * @body {Number} price - Item price
 * @body {String} description - Item description
 * @body {String} imageURL - Item image URL
 * @body {Array} dietaryFlags - Dietary information flags
 */
router.post('/createMenu', authenticateJWT, isAdmin, async (req, res) => {
  try {
    console.log('Creating menu item:', req.body); // Debug log
    console.log('User:', req.user); // Debug log

    const menuItem = await MenuItem.create(req.body);
    res.status(201).json({ menuItem });
  } catch (error) {
    console.error('Menu creation error:', error); // Debug log
    res.status(500).json({ error: 'Error creating menu item' });
  }
});

// Update the menu (only Admin allowed)
router.put('/updateMenu/:id', authenticateJWT, isAdmin, async (req, res) => {
  const { title, category, price, description, imageURL, dietaryFlags } = req.body;

  if (!title || !category || !price || !description || !imageURL) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const menuItem = await MenuItem.findById(req.params.id);
    
    if (!menuItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }

    menuItem.title = title;
    menuItem.category = category;
    menuItem.price = price;
    menuItem.description = description;
    menuItem.imageURL = imageURL;
    menuItem.dietaryFlags = dietaryFlags;

    await menuItem.save();
    res.status(200).json({ message: 'Menu updated successfully', data: menuItem });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update menu item stock
router.patch('/stock/:id', authenticateJWT, isAdmin, async (req, res) => {
  try {
    const { stock } = req.body;
    const menuItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      { stock },
      { new: true }
    );
    
    if (!menuItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }

    res.json(menuItem);
  } catch (error) {
    res.status(500).json({ error: 'Error updating stock' });
  }
});

// Get menu items by category
router.get('/category/:category', async (req, res) => {
  try {
    const menuItems = await MenuItem.find({ 
      category: req.params.category 
    });
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching category items' });
  }
});

// Add new route to check stock before adding to cart
router.get('/check-stock/:id', authenticateJWT, async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json({ inStock: menuItem.isInStock() });
  } catch (error) {
    res.status(500).json({ error: 'Error checking stock' });
  }
});

// Delete the menu (only Admin allowed)
router.delete('/deleteMenu/:id', authenticateJWT, isAdmin, async (req, res, next) => { 
  try {
    const menuItem = await MenuItem.findById(req.params.id);

    if (!menuItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }

    await menuItem.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    next(error); 
  }
});

module.exports = router;
