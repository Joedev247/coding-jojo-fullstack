const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const cartController = require('../controllers/cartController');

// All routes require authentication
router.get('/', auth, cartController.getCart);
router.post('/add', auth, cartController.addToCart);
router.put('/update/:courseId', auth, cartController.updateCartItem);
router.delete('/remove/:courseId', auth, cartController.removeFromCart);
router.delete('/clear', auth, cartController.clearCart);

module.exports = router;
