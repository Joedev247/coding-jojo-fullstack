const Category = require('../models/Category');
const Course = require('../models/Course');

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true }).sort({ name: 1 });
    
    // Update course counts for each category
    for (let category of categories) {
      const courseCount = await Course.countDocuments({ 
        category: category.name,
        status: 'published'
      });
      category.courseCount = courseCount;
      await category.save();
    }

    res.json({
      success: true,
      data: categories,
      message: 'Categories retrieved successfully'
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve categories',
      error: error.message
    });
  }
};

// Get category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    // Update course count
    const courseCount = await Course.countDocuments({ 
      category: category.name,
      status: 'published'
    });
    category.courseCount = courseCount;
    await category.save();

    res.json({
      success: true,
      data: category,
      message: 'Category retrieved successfully'
    });
  } catch (error) {
    console.error('Get category by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve category',
      error: error.message
    });
  }
};

// Create category (admin only)
exports.createCategory = async (req, res) => {
  try {
    const { name, description, icon } = req.body;

    // Check if category already exists
    const existingCategory = await Category.findOne({ name: name.trim() });
    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: 'Category already exists'
      });
    }

    const category = new Category({
      name: name.trim(),
      description: description?.trim(),
      icon: icon?.trim()
    });

    await category.save();

    res.status(201).json({
      success: true,
      data: category,
      message: 'Category created successfully'
    });
  } catch (error) {
    console.error('Create category error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create category',
      error: error.message
    });
  }
};

// Update category (admin only)
exports.updateCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { name, description, icon, isActive } = req.body;

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    // Check if new name conflicts with existing category
    if (name && name.trim() !== category.name) {
      const existingCategory = await Category.findOne({ 
        name: name.trim(),
        _id: { $ne: categoryId }
      });
      if (existingCategory) {
        return res.status(400).json({
          success: false,
          message: 'Category name already exists'
        });
      }
    }

    // Update fields
    if (name) category.name = name.trim();
    if (description !== undefined) category.description = description?.trim();
    if (icon !== undefined) category.icon = icon?.trim();
    if (isActive !== undefined) category.isActive = isActive;

    await category.save();

    res.json({
      success: true,
      data: category,
      message: 'Category updated successfully'
    });
  } catch (error) {
    console.error('Update category error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update category',
      error: error.message
    });
  }
};

// Delete category (admin only)
exports.deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    // Check if category has courses
    const courseCount = await Course.countDocuments({ 
      category: category.name 
    });
    
    if (courseCount > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete category with existing courses'
      });
    }

    await Category.findByIdAndDelete(categoryId);

    res.json({
      success: true,
      message: 'Category deleted successfully'
    });
  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete category',
      error: error.message
    });
  }
};
