const express = require('express');
const { authenticateJWT, isAdmin } = require('./middleware/authMiddleware');
const User = require('./models/User');
const config = require('./config');

/**
 * Router configuration for authentication endpoints
 */

const port = config.PORT || 5000;

const app = express();

const router = express.Router();

/**
 * Route to get user's menu items
 * @route GET /api/user/menu
 * @auth Required
 */
router.get('/user/menu', authenticateJWT, async (req, res) => {
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

/**
 * Route to delete a user
 * @route DELETE /api/user/:id
 * @auth Required
 * @access Admin only
 */
router.delete('/user/:id', authenticateJWT, isAdmin, async (req, res) => {
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
