require('@jest/globals');
require('dotenv').config();
const mongoose = require('mongoose');

beforeAll(async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_TEST_URI);
  }
});

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  if (mongoose.connection.readyState === 1) {
    await Promise.all(
      Object.values(mongoose.connection.collections).map(collection =>
        collection.deleteMany({})
      )
    );
  }
});

jest.setTimeout(10000);