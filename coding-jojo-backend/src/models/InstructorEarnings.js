const mongoose = require('mongoose');

const instructorEarningsSchema = new mongoose.Schema({
  // Instructor reference
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Course reference
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  
  // Transaction reference
  transaction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transaction',
    required: true
  },
  
  // Student who purchased
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Earnings breakdown
  grossAmount: {
    type: Number,
    required: true // Total course price
  },
  platformFee: {
    type: Number,
    required: true // Platform commission (e.g., 20%)
  },
  netAmount: {
    type: Number,
    required: true // Amount instructor receives
  },
  
  // Payment status
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'on_hold', 'cancelled'],
    default: 'pending'
  },
  
  // Payment details
  payout: {
    payoutId: String,
    payoutDate: Date,
    paymentMethod: {
      type: String,
      enum: ['bank_transfer', 'paypal', 'mobile_money', 'check']
    },
    paymentReference: String,
    processorResponse: mongoose.Schema.Types.Mixed
  },
  
  // Timing
  earnedAt: {
    type: Date,
    default: Date.now
  },
  eligibleForPayoutAt: {
    type: Date,
    default: function() {
      // Earnings are eligible for payout after 14 days (to handle refunds)
      const date = new Date();
      date.setDate(date.getDate() + 14);
      return date;
    }
  },
  
  // Currency
  currency: {
    type: String,
    default: 'USD'
  },
  
  // Additional metadata
  metadata: {
    platformFeePercentage: {
      type: Number,
      default: 20 // 20% platform fee
    },
    refunded: {
      type: Boolean,
      default: false
    },
    refundDate: Date,
    refundReason: String,
    notes: String
  }
}, {
  timestamps: true
});

// Indexes for efficient queries
instructorEarningsSchema.index({ instructor: 1 });
instructorEarningsSchema.index({ course: 1 });
instructorEarningsSchema.index({ earnedAt: -1 });
instructorEarningsSchema.index({ paymentStatus: 1 });
instructorEarningsSchema.index({ instructor: 1, earnedAt: -1 });
instructorEarningsSchema.index({ eligibleForPayoutAt: 1, paymentStatus: 1 });

// Static methods for admin analytics
instructorEarningsSchema.statics.getInstructorTotalEarnings = function(instructorId) {
  return this.aggregate([
    { $match: { instructor: mongoose.Types.ObjectId(instructorId), 'metadata.refunded': false } },
    {
      $group: {
        _id: null,
        totalGross: { $sum: '$grossAmount' },
        totalNet: { $sum: '$netAmount' },
        totalPlatformFee: { $sum: '$platformFee' },
        totalTransactions: { $sum: 1 },
        pendingAmount: {
          $sum: {
            $cond: [{ $eq: ['$paymentStatus', 'pending'] }, '$netAmount', 0]
          }
        },
        paidAmount: {
          $sum: {
            $cond: [{ $eq: ['$paymentStatus', 'paid'] }, '$netAmount', 0]
          }
        }
      }
    }
  ]);
};

instructorEarningsSchema.statics.getMonthlyEarnings = function(instructorId, year, month) {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0, 23, 59, 59);
  
  return this.aggregate([
    {
      $match: {
        instructor: mongoose.Types.ObjectId(instructorId),
        earnedAt: { $gte: startDate, $lte: endDate },
        'metadata.refunded': false
      }
    },
    {
      $group: {
        _id: null,
        monthlyGross: { $sum: '$grossAmount' },
        monthlyNet: { $sum: '$netAmount' },
        transactionCount: { $sum: 1 },
        courses: { $addToSet: '$course' }
      }
    }
  ]);
};

instructorEarningsSchema.statics.getAllInstructorsEarnings = function() {
  return this.aggregate([
    {
      $match: { 'metadata.refunded': false }
    },
    {
      $group: {
        _id: '$instructor',
        totalGross: { $sum: '$grossAmount' },
        totalNet: { $sum: '$netAmount' },
        totalPlatformFee: { $sum: '$platformFee' },
        transactionCount: { $sum: 1 },
        pendingAmount: {
          $sum: {
            $cond: [{ $eq: ['$paymentStatus', 'pending'] }, '$netAmount', 0]
          }
        },
        paidAmount: {
          $sum: {
            $cond: [{ $eq: ['$paymentStatus', 'paid'] }, '$netAmount', 0]
          }
        },
        lastEarning: { $max: '$earnedAt' }
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'instructorDetails'
      }
    },
    {
      $unwind: '$instructorDetails'
    },
    {
      $project: {
        instructor: {
          _id: '$instructorDetails._id',
          name: '$instructorDetails.name',
          email: '$instructorDetails.email',
          avatar: '$instructorDetails.avatar'
        },
        totalGross: 1,
        totalNet: 1,
        totalPlatformFee: 1,
        transactionCount: 1,
        pendingAmount: 1,
        paidAmount: 1,
        lastEarning: 1
      }
    },
    {
      $sort: { totalNet: -1 }
    }
  ]);
};

module.exports = mongoose.model('InstructorEarnings', instructorEarningsSchema);
