const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  // Transaction identification
  transactionId: {
    type: String,
    required: true,
    unique: true
  },
  
  // User information
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Transaction type
  type: {
    type: String,
    enum: ['course_purchase', 'subscription', 'refund'],
    required: true
  },
  
  // Amount and currency
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'USD'
  },
  
  // Transaction status
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'cancelled', 'refunded'],
    default: 'pending'
  },
  
  // Payment method information
  paymentMethod: {
    type: {
      type: String,
      enum: ['credit_card', 'debit_card', 'mobile_money', 'paypal', 'bank_transfer'],
      required: true
    },
    details: {
      // For card payments
      last4: String,
      brand: String, // visa, mastercard, etc.
      
      // For mobile money
      phoneNumber: String,
      provider: String, // MTN, Orange, etc.
      
      // For PayPal
      email: String,
      
      // Generic reference
      externalTransactionId: String
    }
  },
  
  // Related entities
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  },
  subscription: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subscription'
  },
  
  // Transaction description
  description: {
    type: String,
    required: true
  },
  
  // Additional metadata
  metadata: {
    planType: String, // for subscriptions: personal, team, enterprise
    billingCycle: String, // monthly, annual
    originalTransactionId: String, // for refunds
    promoCode: String,
    discount: Number,
    tax: Number,
    fees: Number
  },
  
  // External payment processor data
  externalData: {
    stripePaymentIntentId: String,
    paypalOrderId: String,
    momoTransactionId: String,
    processorResponse: mongoose.Schema.Types.Mixed
  },
  
  // Timestamps
  processedAt: Date,
  completedAt: Date,
  failedAt: Date,
  
  // Failure information
  failureReason: String,
  
  // Invoice information
  invoiceNumber: String,
  invoiceUrl: String
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for formatted amount
transactionSchema.virtual('formattedAmount').get(function() {
  return `${this.currency} ${this.amount.toFixed(2)}`;
});

// Virtual for transaction age
transactionSchema.virtual('transactionAge').get(function() {
  return Date.now() - this.createdAt.getTime();
});

// Index for efficient queries
transactionSchema.index({ user: 1, createdAt: -1 });
transactionSchema.index({ status: 1 });
transactionSchema.index({ type: 1 });
transactionSchema.index({ transactionId: 1 });

// Pre-save middleware to generate transaction ID
transactionSchema.pre('save', function(next) {
  if (!this.transactionId) {
    this.transactionId = `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
  next();
});

// Static method to get user's transaction history
transactionSchema.statics.getUserTransactions = function(userId, options = {}) {
  const {
    page = 1,
    limit = 10,
    type,
    status,
    startDate,
    endDate
  } = options;
  
  const query = { user: userId };
  
  if (type) query.type = type;
  if (status) query.status = status;
  if (startDate || endDate) {
    query.createdAt = {};
    if (startDate) query.createdAt.$gte = new Date(startDate);
    if (endDate) query.createdAt.$lte = new Date(endDate);
  }
  
  return this.find(query)
    .populate('course', 'title price')
    .populate('subscription', 'plan status')
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);
};

// Static method to get admin transaction overview
transactionSchema.statics.getAdminStats = async function() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const thisMonth = new Date();
  thisMonth.setDate(1);
  thisMonth.setHours(0, 0, 0, 0);
  
  const stats = await this.aggregate([
    {
      $facet: {
        total: [
          { $match: { status: 'completed' } },
          { $group: { _id: null, amount: { $sum: '$amount' }, count: { $sum: 1 } } }
        ],
        today: [
          { $match: { status: 'completed', createdAt: { $gte: today } } },
          { $group: { _id: null, amount: { $sum: '$amount' }, count: { $sum: 1 } } }
        ],
        thisMonth: [
          { $match: { status: 'completed', createdAt: { $gte: thisMonth } } },
          { $group: { _id: null, amount: { $sum: '$amount' }, count: { $sum: 1 } } }
        ],
        byType: [
          { $match: { status: 'completed' } },
          { $group: { _id: '$type', amount: { $sum: '$amount' }, count: { $sum: 1 } } }
        ],
        byPaymentMethod: [
          { $match: { status: 'completed' } },
          { $group: { _id: '$paymentMethod.type', amount: { $sum: '$amount' }, count: { $sum: 1 } } }
        ],
        recentTransactions: [
          { $sort: { createdAt: -1 } },
          { $limit: 10 },
          {
            $lookup: {
              from: 'users',
              localField: 'user',
              foreignField: '_id',
              as: 'userInfo'
            }
          },
          {
            $lookup: {
              from: 'courses',
              localField: 'course',
              foreignField: '_id',
              as: 'courseInfo'
            }
          }
        ]
      }
    }
  ]);
  
  return stats[0];
};

module.exports = mongoose.model('Transaction', transactionSchema);
