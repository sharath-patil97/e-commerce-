const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const {
  addToCart,
  getCart,
  removeFromCart,
  updateCartItem
} = require('../controllers/cartController');

router.use(authenticateToken);

router.post('/add', addToCart);
router.get('/', getCart);
router.put('/update', updateCartItem);
router.delete('/remove/:productId', removeFromCart);

module.exports = router;
