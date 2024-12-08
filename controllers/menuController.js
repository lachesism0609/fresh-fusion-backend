const Menu = require('../models/MenuItem');

// GET all menu items
exports.getMenu = async (req, res) => {
  try {
    const menu = await Menu.find();
    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch menu items' });
  }
};

// POST new menu item (admin only)
exports.addMenuItem = async (req, res) => {
    console.log('req.role:', req.role); // 调试
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied' });
  }
  try {
    const newItem = new Menu(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ error: 'Failed to add menu item' });
  }
};


// PUT update menu item (admin only)
exports.updateMenuItem = async (req, res) => {
  // Check if user is admin
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied. Only admin can update menu items.' });
  }

  const { title, category, price, description, imageURL, dietaryFlags } = req.body;

  if (!title || !category || !price || !description || !imageURL) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const menuItem = await Menu.findById(req.params.id);

    if (!menuItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }

    // Update the menu item with the new data
    menuItem.title = title;
    menuItem.category = category;
    menuItem.price = price;
    menuItem.description = description;
    menuItem.imageURL = imageURL;
    menuItem.dietaryFlags = dietaryFlags;

    // Save the updated menu item
    await menuItem.save();

    // Send a success response
    res.status(200).json({ message: 'Menu updated successfully', data: menuItem });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// DELETE menu item (admin only)
exports.deleteMenuItem = async (req, res) => { 
    
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Access denied' });
      }

    try {
        const menuItem = await Menu.findById(req.params.id);

        if (!menuItem) {
        return res.status(404).json({ error: 'Menu item not found' });
        }

        await menuItem.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'Menu item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};


  
