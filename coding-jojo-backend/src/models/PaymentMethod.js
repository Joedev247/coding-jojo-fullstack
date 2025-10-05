const mongoose = require('mongoose');

const paymentMethodSchema = new mongoose.Schema({
  // User information
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Payment method type
  type: {
    type: String,
    enum: ['credit_card', 'debit_card', 'mobile_money', 'paypal', 'bank_transfer'],
    required: true
  },
  
  // Common fields
  isDefault: {
    type: Boolean,
    default: false
  },
  
  isActive: {
    type: Boolean,
    default: true
  },
  
  // Card details (for credit/debit cards)
  cardDetails: {
    last4: String,
    brand: String, // visa, mastercard, amex
    expiryMonth: Number,
    expiryYear: Number,
    fingerprint: String, // unique identifier for the card
    funding: String, // credit, debit, prepaid
    country: String
  },
  
  // Mobile Money details
  mobileMoneyDetails: {
    phoneNumber: String,
    provider: String, // MTN, Orange, Airtel
    country: String
  },
  
  // PayPal details
  paypalDetails: {
    email: String,
    payerId: String
  },
  
  // Bank details
  bankDetails: {
    accountNumber: String,
    routingNumber: String,
    bankName: String,
    accountType: String // checking, savings
  },
  
  // External service IDs
  externalIds: {
    stripePaymentMethodId: String,
    paypalPaymentMethodId: String
  },
  
  // Billing address
  billingAddress: {
    line1: String,
    line2: String,
    city: String,
    state: String,
    postalCode: String,
    country: String
  },
  
  // Metadata
  nickname: String, // user-friendly name
  lastUsed: Date,
  
  // Security
  verified: {
    type: Boolean,
    default: false
  },
  verifiedAt: Date
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for display name
paymentMethodSchema.virtual('displayName').get(function() {
  if (this.nickname) return this.nickname;
  
  switch (this.type) {
    case 'credit_card':
    case 'debit_card':
      return `${this.cardDetails.brand} ****${this.cardDetails.last4}`;
    case 'mobile_money':
      return `${this.mobileMoneyDetails.provider} ${this.mobileMoneyDetails.phoneNumber}`;
    case 'paypal':
      return `PayPal ${this.paypalDetails.email}`;
    case 'bank_transfer':
      return `${this.bankDetails.bankName} ****${this.bankDetails.accountNumber?.slice(-4)}`;
    default:
      return this.type;
  }
});

// Virtual for masked details
paymentMethodSchema.virtual('maskedDetails').get(function() {
  switch (this.type) {
    case 'credit_card':
    case 'debit_card':
      return {
        type: this.type,
        last4: this.cardDetails.last4,
        brand: this.cardDetails.brand,
        expiryMonth: this.cardDetails.expiryMonth,
        expiryYear: this.cardDetails.expiryYear
      };
    case 'mobile_money':
      return {
        type: this.type,
        provider: this.mobileMoneyDetails.provider,
        phoneNumber: this.mobileMoneyDetails.phoneNumber?.replace(/(\d{3})\d{3}(\d{3})/, '$1***$2')
      };
    case 'paypal':
      return {
        type: this.type,
        email: this.paypalDetails.email?.replace(/(.{2})(.*)(@.*)/, '$1***$3')
      };
    default:
      return { type: this.type };
  }
});

// Index for efficient queries
paymentMethodSchema.index({ user: 1, isActive: 1 });
paymentMethodSchema.index({ user: 1, isDefault: 1 });

// Pre-save middleware to ensure only one default payment method per user
paymentMethodSchema.pre('save', async function(next) {
  if (this.isDefault && this.isModified('isDefault')) {
    await this.constructor.updateMany(
      { user: this.user, _id: { $ne: this._id } },
      { isDefault: false }
    );
  }
  next();
});

// Static method to get user's payment methods
paymentMethodSchema.statics.getUserPaymentMethods = function(userId) {
  return this.find({ user: userId, isActive: true }).sort({ isDefault: -1, createdAt: -1 });
};

// Instance method to set as default
paymentMethodSchema.methods.setAsDefault = async function() {
  await this.constructor.updateMany(
    { user: this.user },
    { isDefault: false }
  );
  this.isDefault = true;
  return this.save();
};

// Instance method to deactivate
paymentMethodSchema.methods.deactivate = function() {
  this.isActive = false;
  if (this.isDefault) {
    this.isDefault = false;
  }
  return this.save();
};

module.exports = mongoose.model('PaymentMethod', paymentMethodSchema);
