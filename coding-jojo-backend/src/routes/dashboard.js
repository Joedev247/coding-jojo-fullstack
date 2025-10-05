const express = require('express');
const router = express.Router();
const { getDashboardData, getAnalytics } = require('../controllers/dashboardController');
const { auth } = require('../middleware/auth');

// All dashboard routes require authentication
router.use(auth);

router.get('/', getDashboardData);
router.get('/analytics', getAnalytics);

module.exports = router;
