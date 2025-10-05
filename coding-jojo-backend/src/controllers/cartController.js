const Cart = require('../models/cart');
const Course = require('../models/Course');

// Get current user's cart
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.course');
    if (!cart) return res.json({ success: true, data: { items: [], summary: { subtotal: 0, tax: 0, total: 0, itemCount: 0 } } });
    // Calculate summary
    const subtotal = cart.items.reduce((sum, item) => sum + (item.course.price * item.quantity), 0);
    const tax = Math.round(subtotal * 0.1); // 10% tax
    const total = subtotal + tax;
    const itemCount = cart.items.length;
    res.json({ success: true, data: { items: cart.items, summary: { subtotal, tax, total, itemCount } } });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching cart', error: err.message });
  }
};

// Add course to cart
exports.addToCart = async (req, res) => {
  try {
    const { courseId, quantity } = req.body;
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ success: false, message: 'Course not found' });
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) cart = new Cart({ user: req.user.id, items: [] });
    const existing = cart.items.find(item => item.course.equals(courseId));
    if (existing) {
      existing.quantity += quantity || 1;
    } else {
      cart.items.push({ course: courseId, quantity: quantity || 1 });
    }
    await cart.save();
    res.json({ success: true, message: 'Added to cart' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error adding to cart', error: err.message });
  }
};

// Update cart item quantity
exports.updateCartItem = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { quantity } = req.body;
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ success: false, message: 'Cart not found' });
    const item = cart.items.find(item => item.course.equals(courseId));
    if (!item) return res.status(404).json({ success: false, message: 'Item not found in cart' });
    item.quantity = quantity;
    await cart.save();
    res.json({ success: true, message: 'Quantity updated' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error updating cart item', error: err.message });
  }
};

// Remove course from cart
exports.removeFromCart = async (req, res) => {
  try {
    const { courseId } = req.params;
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ success: false, message: 'Cart not found' });
    cart.items = cart.items.filter(item => !item.course.equals(courseId));
    await cart.save();
    res.json({ success: true, message: 'Removed from cart' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error removing from cart', error: err.message });
  }
};

// Clear cart
exports.clearCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ success: false, message: 'Cart not found' });
    cart.items = [];
    await cart.save();
    res.json({ success: true, message: 'Cart cleared' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error clearing cart', error: err.message });
  }
};
