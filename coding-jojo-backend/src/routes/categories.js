const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

// Public routes
router.get('/', categoryController.getCategories);
router.get('/:categoryId', categoryController.getCategoryById);

// Admin routes (protected)
router.post('/', authenticateToken, requireAdmin, categoryController.createCategory);
router.put('/:categoryId', authenticateToken, requireAdmin, categoryController.updateCategory);
router.delete('/:categoryId', authenticateToken, requireAdmin, categoryController.deleteCategory);

module.exports = router;
