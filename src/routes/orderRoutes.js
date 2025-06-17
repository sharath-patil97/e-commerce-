const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const { placeOrder, getUserOrders, getAllOrders,updateOrderStatus } = require('../controllers/orderController');
const isAdmin = require('../middleware/isAdmin');

router.use(authenticateToken);

router.post('/place', placeOrder);
router.get('/my-orders', getUserOrders);
router.get('/all',isAdmin, getAllOrders); // admin only
router.put('/update-status/:orderId', isAdmin, updateOrderStatus);

module.exports = router;
