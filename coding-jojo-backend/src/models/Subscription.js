const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  // Subscription identification
  subscriptionId: {
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
  
  // Plan information
  plan: {
    type: String,
    enum: ['free', 'personal', 'team', 'enterprise'],
    required: true
  },
  
  // Subscription status
  status: {
    type: String,
    enum: ['active', 'cancelled', 'expired', 'trial', 'past_due', 'paused'],
    default: 'active'
  },
  
  // Billing information
  billingCycle: {
    type: String,
    enum: ['monthly', 'annual'],
    required: true
  },
  
  amount: {
    type: Number,
    required: true
  },
  
  currency: {
    type: String,
    default: 'USD'
  },
  
  // Dates
  startDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  
  endDate: {
    type: Date,
    required: true
  },
  
  nextBillingDate: {
    type: Date,
    required: true
  },
  
  trialEndDate: Date,
  
  cancelledAt: Date,
  pausedAt: Date,
  
  // Payment method
  paymentMethod: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PaymentMethod'
  },
  
  // External service IDs
  externalIds: {
    stripeSubscriptionId: String,
    paypalSubscriptionId: String
  },
  
  // Subscription features based on plan
  features: [{
    type: String
  }],
  
  // Billing history
  billingHistory: [{
    date: Date,
    amount: Number,
    status: {
      type: String,
      enum: ['paid', 'failed', 'pending']
    },
    transaction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Transaction'
    }
  }],
  
  // Cancellation information
  cancellationReason: String,
  cancellationDate: Date,
  
  // Metadata
  metadata: {
    source: String, // web, mobile, api
    promoCode: String,
    discount: Number,
    upgradeFromPlan: String,
    notes: String
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for subscription age
subscriptionSchema.virtual('subscriptionAge').get(function() {
  return Date.now() - this.startDate.getTime();
});

// Virtual for days remaining
subscriptionSchema.virtual('daysRemaining').get(function() {
  if (this.status === 'cancelled' || this.status === 'expired') return 0;
  const now = new Date();
  const diff = this.endDate.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
});

// Virtual for is active
subscriptionSchema.virtual('isActive').get(function() {
  return this.status === 'active' && new Date() < this.endDate;
});

// Index for efficient queries
subscriptionSchema.index({ user: 1 });
subscriptionSchema.index({ status: 1 });
subscriptionSchema.index({ plan: 1 });
subscriptionSchema.index({ nextBillingDate: 1 });

// Pre-save middleware to generate subscription ID
subscriptionSchema.pre('save', function(next) {
  if (!this.subscriptionId) {
    this.subscriptionId = `SUB_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
  next();
});

// Static method to get plan features
subscriptionSchema.statics.getPlanFeatures = function(plan) {
  const features = {
    free: [
      'Access to 3 free courses',
      'Basic community access',
      'Standard support'
    ],
    personal: [
      'Access to all courses',
      'Premium learning materials',
      'Priority support',
      'Downloadable resources',
      'Certificate of completion',
      'Mobile app access'
    ],
    team: [
      'Everything in Personal',
      'Team management dashboard',
      'Progress tracking',
      'Bulk user management',
      'Advanced analytics',
      'Custom branding'
    ],
    enterprise: [
      'Everything in Team',
      'Custom integrations',
      'SSO authentication',
      'Dedicated support',
      'Custom content',
      'API access',
      'Advanced security features'
    ]
  };
  
  return features[plan] || [];
};

// Static method to get subscription stats for admin
subscriptionSchema.statics.getSubscriptionStats = async function() {
  const stats = await this.aggregate([
    {
      $facet: {
        byPlan: [
          { $group: { _id: '$plan', count: { $sum: 1 }, revenue: { $sum: '$amount' } } }
        ],
        byStatus: [
          { $group: { _id: '$status', count: { $sum: 1 } } }
        ],
        total: [
          { $group: { _id: null, count: { $sum: 1 }, totalRevenue: { $sum: '$amount' } } }
        ],
        activeSubscriptions: [
          { $match: { status: 'active', endDate: { $gt: new Date() } } },
          { $group: { _id: null, count: { $sum: 1 } } }
        ],
        churnRate: [
          {
            $match: {
              status: 'cancelled',
              cancelledAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
            }
          },
          { $group: { _id: null, count: { $sum: 1 } } }
        ]
      }
    }
  ]);
  
  return stats[0];
};

// Instance method to cancel subscription
subscriptionSchema.methods.cancel = function(reason) {
  this.status = 'cancelled';
  this.cancelledAt = new Date();
  this.cancellationReason = reason;
  return this.save();
};

// Instance method to renew subscription
subscriptionSchema.methods.renew = function() {
  const now = new Date();
  if (this.billingCycle === 'monthly') {
    this.nextBillingDate = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
    this.endDate = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
  } else {
    this.nextBillingDate = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());
    this.endDate = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());
  }
  this.status = 'active';
  return this.save();
};

module.exports = mongoose.model('Subscription', subscriptionSchema);
