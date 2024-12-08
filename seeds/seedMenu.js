const mongoose = require('mongoose');
const MenuItem = require('../models/MenuItem');
const config = require('../utils/config');

const menuItems = [
  {
    title: "Salmon Nigiri",
    category: "Nigiri",
    price: 8.99,
    description: "Fresh salmon on hand-pressed rice",
    imageUrl: "https://example.com/salmon-nigiri.jpg",
    dietaryFlags: ["pescatarian"],
    stock: 50,
    ingredients: ["salmon", "rice", "wasabi"],
    popularity: 5,
    isSpecial: true
  },
  {
    title: "California Roll",
    category: "Maki",
    price: 7.99,
    description: "Crab meat, avocado, and cucumber roll",
    imageUrl: "https://example.com/california-roll.jpg",
    dietaryFlags: ["pescatarian"],
    stock: 40,
    ingredients: ["crab meat", "avocado", "cucumber", "rice", "nori"],
    popularity: 4,
    isSpecial: false
  },
  {
    title: "Vegetable Tempura",
    category: "Appetizers",
    price: 6.99,
    description: "Assorted vegetables in crispy tempura batter",
    imageUrl: "https://example.com/veg-tempura.jpg",
    dietaryFlags: ["vegetarian"],
    stock: 30,
    ingredients: ["sweet potato", "broccoli", "carrot", "tempura batter"],
    popularity: 3,
    isSpecial: false
  },
  {
    title: "Spicy Tuna Roll",
    category: "Maki",
    price: 9.99,
    description: "Fresh tuna with spicy mayo and cucumber",
    imageUrl: "https://example.com/spicy-tuna.jpg",
    dietaryFlags: ["pescatarian", "spicy"],
    stock: 45,
    ingredients: ["tuna", "spicy mayo", "cucumber", "rice", "nori"],
    popularity: 5,
    isSpecial: true
  },
  {
    title: "Dragon Roll",
    category: "Special Rolls",
    price: 14.99,
    description: "Eel and cucumber roll topped with avocado",
    imageUrl: "https://example.com/dragon-roll.jpg",
    dietaryFlags: ["pescatarian"],
    stock: 25,
    ingredients: ["eel", "cucumber", "avocado", "rice", "nori", "eel sauce"],
    popularity: 5,
    isSpecial: true
  },
  {
    title: "Miso Soup",
    category: "Soups",
    price: 3.99,
    description: "Traditional Japanese soybean soup with tofu and seaweed",
    imageUrl: "https://example.com/miso-soup.jpg",
    dietaryFlags: ["vegetarian"],
    stock: 100,
    ingredients: ["miso paste", "tofu", "wakame seaweed", "green onion"],
    popularity: 4,
    isSpecial: false
  },
  {
    title: "Tuna Sashimi",
    category: "Sashimi",
    price: 12.99,
    description: "Premium cuts of fresh raw tuna",
    imageUrl: "https://example.com/tuna-sashimi.jpg",
    dietaryFlags: ["pescatarian", "gluten-free"],
    stock: 30,
    ingredients: ["tuna"],
    popularity: 4,
    isSpecial: false
  },
  {
    title: "Tempura Udon",
    category: "Noodles",
    price: 11.99,
    description: "Thick wheat noodles in hot soup with tempura shrimp",
    imageUrl: "https://example.com/tempura-udon.jpg",
    dietaryFlags: [],
    stock: 35,
    ingredients: ["udon noodles", "tempura shrimp", "fish cake", "green onion"],
    popularity: 4,
    isSpecial: false
  },
  {
    title: "Rainbow Roll",
    category: "Special Rolls",
    price: 15.99,
    description: "California roll topped with various sashimi",
    imageUrl: "https://example.com/rainbow-roll.jpg",
    dietaryFlags: ["pescatarian"],
    stock: 20,
    ingredients: ["tuna", "salmon", "yellowtail", "avocado", "crab meat", "cucumber", "rice", "nori"],
    popularity: 5,
    isSpecial: true
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(config.MONGODB_URI);
    
    // Clear existing data
    await MenuItem.deleteMany({});
    
    // Insert menu items
    await MenuItem.insertMany(menuItems);
    
    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();