const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const { createProduct, getProducts, getProductById,searchProducts } = require('../controllers/productController');
const upload = require('../middleware/upload');
const isAdmin = require('../middleware/isAdmin')

// Admin only - create product
// router.post('/', authenticateToken, createProduct);

// Public - get all products
router.get('/', getProducts);
router.get('/search', searchProducts);

// Public - get one product
router.get('/:id', getProductById);



router.post('/', authenticateToken, isAdmin, upload.single('image'), createProduct);



module.exports = router;
