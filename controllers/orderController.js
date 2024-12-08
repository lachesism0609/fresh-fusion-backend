const Order = require('../models/Order');

/**
 * Creates a new order in the system
 * @route POST /api/orders
 * @param {Object} req.body - Order details including items and delivery info
 */
exports.createOrder = async (req, res) => {
    try {
        const { items, totalPrice, deliveryAddress, contactNumber } = req.body;
        
        const order = new Order({
            userId: req.userId,
            items,
            totalPrice,
            deliveryAddress,
            contactNumber,
            status: 'pending'
        });

        const savedOrder = await order.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Retrieves all orders for a specific user
 * @route GET /api/orders/user
 */
exports.getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user._id })
            .populate('items.menuItemId')
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Updates the status of an existing order
 * @route PUT /api/orders/:id/status
 * @param {string} req.params.id - Order ID
 * @param {string} req.body.status - New order status
 */
exports.updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });
        
        order.status = req.body.status;
        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Retrieves all orders in the system
 * @route GET /api/orders
 * @access Admin only
 */
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('userId')
            .populate('items.menuItemId')
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
