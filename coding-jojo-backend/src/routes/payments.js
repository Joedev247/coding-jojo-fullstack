const express = require('express');
const router = express.Router();
const {
  initializePayment,
  verifyPayment,
  getPaymentMethods,
  getPaymentHistory,
  createPaymentIntent,
  processPayment
} = require('../controllers/paymentController');
const { auth } = require('../middleware/auth');

// All payment routes require authentication
router.use(auth);

// User payment routes
router.post('/create-intent', createPaymentIntent);
router.post('/process', processPayment);
router.get('/history', getPaymentHistory);

// Payment initialization and verification  
router.post('/initialize', initializePayment);
router.post('/verify', verifyPayment);

// Payment methods
router.get('/methods', getPaymentMethods);

module.exports = router;
