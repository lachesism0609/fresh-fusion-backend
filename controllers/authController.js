const express = require('express');
const { authenticateJWT, isAdmin } = require('./middleware/authMiddleware'); // 引入中间件
const Vehicle = require('./models/Vehicle');
const User = require('./models/User');
const config = require('./config');

const port = config.PORT || 5000;

// const app = express();

const router = express.Router();

app.get('/user/menu', authenticateJWT, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('vehicles');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(200).json({ vehicles: user.vehicles });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.delete('/user/:id', authenticateJWT, isAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    await user.remove();
    res.status(200).json({ msg: 'User deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
