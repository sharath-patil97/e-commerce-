const express = require('express');
const router = express.Router();
// const { registerUser } = require('../controllers/authController');
const { registerUser, loginUser } = require('../controllers/authController');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser); 
router.get('/profile', authenticateToken, (req, res) => {
  res.json({
    message: 'This is a protected profile route',
    user: req.user
  });
});

module.exports = router;




