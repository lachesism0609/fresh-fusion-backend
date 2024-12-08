const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');
const { authenticateJWT, isAdmin } = require('../middleware/authMiddleware');

// Get menu items with filters
router.get('/', async (req, res) => {
  try {
    const { 
      category, 
      search, 
      minPrice, 
      maxPrice,
      dietary,
      page = 1,
      limit = 10
    } = req.query;

    let query = {};

    if (category) query.category = category;
    if (dietary) query.dietaryFlags = { $in: dietary.split(',') };
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const skip = (page - 1) * limit;
    
    const [menuItems, total] = await Promise.all([
      MenuItem.find(query)
        .skip(skip)
        .limit(Number(limit))
        .sort({ popularity: -1 }),
      MenuItem.countDocuments(query)
    ]);

    res.json({
      items: menuItems,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching menu items', error: error.message });
  }
});

// Post new menu (requires admin authentication)
router.post('/createMenu', authenticateJWT, isAdmin, async (req, res) => {
  try {
    const { title, category, price, description, imageURL, dietaryFlags } = req.body; 
    
    const newMenuItem = new MenuItem({
      title,
      category,
      price,
      description,
      imageURL,
      dietaryFlags,
    });

    const savedMenuItem = await newMenuItem.save();
    res.status(201).json(savedMenuItem); 
  } catch (error) {
    res.status(400).json({ message: 'Error creating menu item', error });
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
