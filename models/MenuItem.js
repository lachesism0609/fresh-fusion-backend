// models/MenuItem.js
const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  dietaryFlags: [String], // optional, e.g., ['vegan', 'gluten-free'],
  stock: { type: Number, required: true, default: 0 },
  ingredients: [String],
  popularity: { type: Number, default: 0 },
  isSpecial: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

// Add a method to check stock
menuItemSchema.methods.isInStock = function() {
  return this.stock > 0;
};

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;
