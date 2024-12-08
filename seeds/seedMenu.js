const mongoose = require('mongoose');
const MenuItem = require('../models/MenuItem');
const config = require('../utils/config');

const menuItems = [
  {
    title: "Salmon Nigiri",
    category: "Nigiri",
    price: 8.99,
    description: "Fresh salmon on hand-pressed rice",
<<<<<<< HEAD
=======
    imageUrl: "https://example.com/salmon-nigiri.jpg",
>>>>>>> 4b280d01bfc0cff1f28ad164c177889dfbc584c6
    imageUrl: "https://images.pexels.com/photos/26731029/pexels-photo-26731029.jpeg",
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
    imageUrl: "https://images.pexels.com/photos/10297213/pexels-photo-10297213.jpeg",
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
    imageUrl: "https://cdn.pixabay.com/photo/2020/04/20/07/28/japan-food-5066736_1280.jpg",
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
    imageUrl: "https://images.pexels.com/photos/26731034/pexels-photo-26731034.jpeg",
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
    imageUrl: "https://images.pexels.com/photos/29643085/pexels-photo-29643085.jpeg",
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
    imageUrl: "https://green.xgoo.jp/cdn/column/upload/img/thumbnail/lar/lar-58592.jpg",
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
    imageUrl: "https://cdn.pixabay.com/photo/2017/08/01/08/48/sashimi-2563650_1280.jpg",
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
    imageUrl: "https://images.pexels.com/photos/2098131/pexels-photo-2098131.jpeg",
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
    imageUrl: "https://cdn.websites.hibu.com/a165e9738dc14c87836f9de7337c071e/dms3rep/multi/Sushi.jpg",
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