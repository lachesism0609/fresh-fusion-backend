//utils/confiig.js

require('dotenv').config();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGO_URI;  // 获取 MongoDB URI

module.exports = {
  MONGODB_URI,
  PORT
};
