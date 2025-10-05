const Transaction = require('../models/Transaction');
const Course = require('../models/Course');
const User = require('../models/User');
const Notification = require('../models/Notification');
const mobileMoneyService = require('../services/mobileMoneyService');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { emitToUser } = require('../socket');

// Initialize payment
const initializePayment = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      courseId,
      paymentMethod, // 'stripe', 'orange', 'mtn', 'airtel', 'flutterwave'
      amount,
      currency = 'XAF',
      phoneNumber, // For mobile money
      country = 'CM'
    } = req.body;

    // Validate course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Check if user already enrolled
    const existingEnrollment = course.enrollments.find(
      enrollment => enrollment.student.toString() === userId
    );

    if (existingEnrollment) {
      return res.status(400).json({
        success: false,
        message: 'Already enrolled in this course'
      });
    }

    // Generate transaction reference
    const reference = `CJ_${courseId.substring(0, 8)}_${userId.substring(0, 8)}_${Date.now()}`;

    // Create transaction record
    const transaction = new Transaction({
      user: userId,
      course: courseId,
      amount: parseFloat(amount),
      currency,
      paymentMethod,
      reference,
      status: 'pending',
      metadata: {
        courseTitle: course.title,
        userEmail: req.user.email,
        phoneNumber,
        country
      }
    });

    await transaction.save();

    let paymentResult;

    // Process payment based on method
    switch (paymentMethod) {
      case 'stripe':
        paymentResult = await processStripePayment({
          amount: amount * 100, // Stripe uses cents
          currency: currency.toLowerCase(),
          reference,
          courseId,
          userId,
          userEmail: req.user.email
        });
        break;

      case 'orange':
        paymentResult = await mobileMoneyService.processOrangeMoneyPayment({
          amount,
          phoneNumber,
          courseId,
          userId,
          reference
        });
        break;

      case 'mtn':
        paymentResult = await mobileMoneyService.processMTNMoMoPayment({
          amount,
          phoneNumber,
          courseId,
          userId,
          reference
        });
        break;

      case 'flutterwave':
        paymentResult = await mobileMoneyService.processFlutterwavePayment({
          amount,
          phoneNumber,
          courseId,
          userId,
          reference,
          country
        });
        break;

      default:
        return res.status(400).json({
          success: false,
          message: 'Unsupported payment method'
        });
    }

    if (!paymentResult.success) {
      transaction.status = 'failed';
      transaction.failureReason = paymentResult.error;
      await transaction.save();

      return res.status(400).json({
        success: false,
        message: paymentResult.error
      });
    }

    // Update transaction with payment details
    transaction.providerTransactionId = paymentResult.transactionId;
    transaction.providerResponse = paymentResult;
    await transaction.save();

    res.json({
      success: true,
      data: {
        transactionId: transaction._id,
        reference,
        paymentUrl: paymentResult.paymentUrl,
        providerTransactionId: paymentResult.transactionId,
        status: 'pending'
      }
    });

  } catch (error) {
    console.error('Payment initialization error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Stripe payment processing
const processStripePayment = async (paymentData) => {
  try {
    const { amount, currency, reference, courseId, userId, userEmail } = paymentData;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      metadata: {
        reference,
        courseId,
        userId,
        platform: 'coding_jojo'
      },
      receipt_email: userEmail
    });

    return {
      success: true,
      transactionId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

    // In a real app, you would create a Stripe payment intent here
    const paymentIntent = {
      id: `pi_${Date.now()}`,
      amount: amount * 100, // Stripe uses cents
      currency,
      status: 'requires_payment_method',
      client_secret: `pi_${Date.now()}_secret_${Math.random().toString(36).substr(2, 9)}`,
      transactionId: transaction._id
    };

    res.json({
      success: true,
      paymentIntent,
      transaction: {
        id: transaction._id,
        transactionId: transaction.transactionId,
        status: transaction.status
      }
    });

  } catch (error) {
    console.error('Create payment intent error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating payment intent'
    });
  }
};

// @desc    Confirm payment
// @route   POST /api/payments/confirm
// @access  Private
const confirmPayment = async (req, res) => {
  try {
    const { 
      paymentIntentId, 
      transactionId, 
      paymentMethodData, 
      courseId,
      subscriptionPlan 
    } = req.body;
    const userId = req.user.id || req.user._id;

    if (!paymentIntentId && !transactionId) {
      return res.status(400).json({
        success: false,
        message: 'Payment intent ID or transaction ID is required'
      });
    }

    // Find the transaction
    let transaction;
    if (transactionId) {
      transaction = await Transaction.findById(transactionId);
    } else {
      transaction = await Transaction.findOne({ 
        'externalData.stripePaymentIntentId': paymentIntentId 
      });
    }

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }

    // Verify transaction belongs to user
    if (transaction.user.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized'
      });
    }

    // Save payment method if provided
    let paymentMethod = null;
    if (paymentMethodData) {
      paymentMethod = new PaymentMethod({
        user: userId,
        type: paymentMethodData.type,
        isDefault: paymentMethodData.saveAsDefault || false,
        verified: true,
        verifiedAt: new Date()
      });

      // Set type-specific details
      switch (paymentMethodData.type) {
        case 'credit_card':
        case 'debit_card':
          paymentMethod.cardDetails = {
            last4: paymentMethodData.cardNumber?.slice(-4),
            brand: paymentMethodData.brand || 'unknown',
            expiryMonth: paymentMethodData.expiryMonth,
            expiryYear: paymentMethodData.expiryYear,
            country: paymentMethodData.country || 'US'
          };
          break;
        case 'mobile_money':
          paymentMethod.mobileMoneyDetails = {
            phoneNumber: paymentMethodData.phoneNumber,
            provider: paymentMethodData.provider || 'MTN',
            country: paymentMethodData.country || 'CM'
          };
          break;
        case 'paypal':
          paymentMethod.paypalDetails = {
            email: paymentMethodData.email
          };
          break;
      }

      await paymentMethod.save();
    }

    // Update transaction
    transaction.status = 'completed';
    transaction.completedAt = new Date();
    transaction.paymentMethod = {
      type: paymentMethodData?.type || 'unknown',
      details: paymentMethod ? paymentMethod.maskedDetails : {}
    };
    transaction.externalData = {
      ...transaction.externalData,
      stripePaymentIntentId: paymentIntentId,
      processorResponse: {
        confirmedAt: new Date(),
        paymentMethodId: paymentMethod?._id
      }
    };

    await transaction.save();

    // Handle course purchase
    if (transaction.type === 'course_purchase' && courseId) {
      const course = await Course.findById(courseId);
      if (course) {
        // Add user to course enrollments
        if (!course.enrolledStudents.includes(userId)) {
          course.enrolledStudents.push(userId);
          course.totalEnrollments = course.enrolledStudents.length;
          await course.save();
        }

        // Update user's enrolled courses
        const user = await User.findById(userId);
        if (user && !user.enrolledCourses.includes(courseId)) {
          user.enrolledCourses.push(courseId);
          await user.save();
        }
      }
    }

    // Handle subscription
    if (transaction.type === 'subscription' && subscriptionPlan) {
      const user = await User.findById(userId);
      
      // Create or update subscription
      let subscription = await Subscription.findOne({ user: userId, status: 'active' });
      
      if (subscription) {
        // Upgrade existing subscription
        subscription.plan = subscriptionPlan;
        subscription.amount = transaction.amount;
        subscription.billingCycle = transaction.metadata.billingCycle || 'monthly';
        subscription.nextBillingDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
        subscription.endDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
      } else {
        // Create new subscription
        subscription = new Subscription({
          user: userId,
          plan: subscriptionPlan,
          billingCycle: transaction.metadata.billingCycle || 'monthly',
          amount: transaction.amount,
          startDate: new Date(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          paymentMethod: paymentMethod?._id,
          features: Subscription.getPlanFeatures(subscriptionPlan),
          metadata: {
            source: 'web',
            upgradeFromPlan: user.isPremium ? 'free' : null
          }
        });
      }

      await subscription.save();

      // Update transaction with subscription reference
      transaction.subscription = subscription._id;
      await transaction.save();

      // Update user premium status
      if (user) {
        user.isPremium = true;
        user.premiumExpiresAt = subscription.endDate;
        await user.save();
      }
    }

    // Populate transaction for response
    await transaction.populate('course', 'title price');
    await transaction.populate('subscription', 'plan status');

    res.json({
      success: true,
      message: 'Payment confirmed successfully',
      transaction: {
        id: transaction._id,
        transactionId: transaction.transactionId,
        type: transaction.type,
        amount: transaction.amount,
        currency: transaction.currency,
        status: transaction.status,
        description: transaction.description,
        completedAt: transaction.completedAt,
        course: transaction.course,
        subscription: transaction.subscription
      }
    });

  } catch (error) {
    console.error('Confirm payment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while confirming payment'
    });
  }
};

// @desc    Get user's purchase history
// @route   GET /api/payments/history
// @access  Private
const getPurchaseHistory = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const { 
      page = 1, 
      limit = 10, 
      type, 
      status, 
      startDate, 
      endDate 
    } = req.query;

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      type,
      status,
      startDate,
      endDate
    };

    const transactions = await Transaction.getUserTransactions(userId, options);
    const totalTransactions = await Transaction.countDocuments({ user: userId });

    // Calculate user stats
    const userStats = await Transaction.aggregate([
      { $match: { user: userId, status: 'completed' } },
      {
        $group: {
          _id: null,
          totalSpent: { $sum: '$amount' },
          totalTransactions: { $sum: 1 },
          avgTransactionAmount: { $avg: '$amount' }
        }
      }
    ]);

    const stats = userStats[0] || {
      totalSpent: 0,
      totalTransactions: 0,
      avgTransactionAmount: 0
    };

    res.json({
      success: true,
      transactions,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalTransactions / parseInt(limit)),
        totalItems: totalTransactions,
        itemsPerPage: parseInt(limit)
      },
      stats
    });

  } catch (error) {
    console.error('Get purchase history error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching purchase history'
    });
  }
};

// @desc    Create subscription
// @route   POST /api/payments/subscribe
// @access  Private
const createSubscription = async (req, res) => {
  try {
    const { 
      plan = 'personal', 
      billingCycle = 'monthly',
      paymentMethodId,
      promoCode 
    } = req.body;
    const userId = req.user.id || req.user._id;

    // Validate plan
    const validPlans = ['personal', 'team', 'enterprise'];
    if (!validPlans.includes(plan)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid subscription plan'
      });
    }

    // Calculate amount based on plan and billing cycle
    const planPricing = {
      personal: { monthly: 10, annual: 96 },
      team: { monthly: 30, annual: 288 },
      enterprise: { monthly: 100, annual: 960 }
    };

    const amount = planPricing[plan][billingCycle];

    // Check if user already has an active subscription
    const existingSubscription = await Subscription.findOne({ 
      user: userId, 
      status: { $in: ['active', 'trial'] } 
    });

    if (existingSubscription) {
      return res.status(400).json({
        success: false,
        message: 'User already has an active subscription',
        subscription: existingSubscription
      });
    }

    // Calculate dates
    const startDate = new Date();
    let endDate, nextBillingDate;
    
    if (billingCycle === 'monthly') {
      endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate());
      nextBillingDate = new Date(endDate);
    } else {
      endDate = new Date(startDate.getFullYear() + 1, startDate.getMonth(), startDate.getDate());
      nextBillingDate = new Date(endDate);
    }

    // Create subscription
    const subscription = new Subscription({
      user: userId,
      plan,
      billingCycle,
      amount,
      startDate,
      endDate,
      nextBillingDate,
      paymentMethod: paymentMethodId,
      features: Subscription.getPlanFeatures(plan),
      metadata: {
        source: 'web',
        promoCode
      }
    });

    await subscription.save();

    // Update user's premium status
    const user = await User.findById(userId);
    if (user) {
      user.isPremium = true;
      user.premiumExpiresAt = endDate;
      await user.save();
    }

    res.json({
      success: true,
      message: 'Subscription created successfully',
      subscription: {
        id: subscription._id,
        subscriptionId: subscription.subscriptionId,
        plan: subscription.plan,
        status: subscription.status,
        billingCycle: subscription.billingCycle,
        amount: subscription.amount,
        startDate: subscription.startDate,
        endDate: subscription.endDate,
        nextBillingDate: subscription.nextBillingDate,
        features: subscription.features
      }
    });

  } catch (error) {
    console.error('Create subscription error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating subscription'
    });
  }
};

// @desc    Get user subscription
// @route   GET /api/payments/subscription
// @access  Private
const getUserSubscription = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;

    const subscription = await Subscription.findOne({ 
      user: userId,
      status: { $in: ['active', 'trial', 'past_due'] }
    }).populate('paymentMethod');

    if (!subscription) {
      return res.json({
        success: true,
        subscription: null,
        message: 'No active subscription found'
      });
    }

    res.json({
      success: true,
      subscription: {
        id: subscription._id,
        subscriptionId: subscription.subscriptionId,
        plan: subscription.plan,
        status: subscription.status,
        billingCycle: subscription.billingCycle,
        amount: subscription.amount,
        currency: subscription.currency,
        startDate: subscription.startDate,
        endDate: subscription.endDate,
        nextBillingDate: subscription.nextBillingDate,
        features: subscription.features,
        daysRemaining: subscription.daysRemaining,
        isActive: subscription.isActive,
        paymentMethod: subscription.paymentMethod?.maskedDetails
      }
    });

  } catch (error) {
    console.error('Get user subscription error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching subscription'
    });
  }
};

// @desc    Cancel subscription
// @route   POST /api/payments/subscription/cancel
// @access  Private
const cancelSubscription = async (req, res) => {
  try {
    const { reason } = req.body;
    const userId = req.user.id || req.user._id;

    const subscription = await Subscription.findOne({ 
      user: userId,
      status: 'active'
    });

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'No active subscription found'
      });
    }

    await subscription.cancel(reason);

    res.json({
      success: true,
      message: 'Subscription cancelled successfully',
      subscription: {
        id: subscription._id,
        status: subscription.status,
        cancelledAt: subscription.cancelledAt,
        endDate: subscription.endDate
      }
    });

  } catch (error) {
    console.error('Cancel subscription error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while cancelling subscription'
    });
  }
};

// Verify payment status
const verifyPayment = async (req, res) => {
  try {
    const { transactionId, provider } = req.params;
    const userId = req.user.id;

    const transaction = await Transaction.findOne({
      _id: transactionId,
      user: userId
    }).populate('course', 'title price instructor');

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }

    let verificationResult;

    if (provider && transaction.providerTransactionId) {
      verificationResult = await mobileMoneyService.checkPaymentStatus(
        transaction.providerTransactionId,
        provider
      );
    } else if (transaction.paymentMethod === 'stripe') {
      const paymentIntent = await stripe.paymentIntents.retrieve(
        transaction.providerTransactionId
      );
      verificationResult = {
        success: true,
        status: paymentIntent.status === 'succeeded' ? 'completed' : paymentIntent.status
      };
    }

    if (verificationResult && verificationResult.success) {
      const paymentStatus = verificationResult.status;

      if (paymentStatus === 'completed' || paymentStatus === 'succeeded') {
        // Update transaction
        transaction.status = 'completed';
        transaction.completedAt = new Date();
        await transaction.save();

        // Enroll user in course
        await enrollUserInCourse(transaction.user, transaction.course._id);

        // Send notification
        await Notification.createNotification({
          recipient: userId,
          type: 'payment_received',
          title: 'Payment Successful',
          message: `Your payment for "${transaction.course.title}" has been processed successfully. You now have access to the course!`,
          data: {
            courseId: transaction.course._id,
            transactionId: transaction._id,
            url: `/courses/${transaction.course._id}`
          }
        });

        res.json({
          success: true,
          data: {
            status: 'completed',
            transaction,
            message: 'Payment verified and course access granted'
          }
        });
      } else {
        res.json({
          success: true,
          data: {
            status: paymentStatus,
            transaction
          }
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: 'Could not verify payment status'
      });
    }

  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Enroll user in course after successful payment
const enrollUserInCourse = async (userId, courseId) => {
  try {
    const course = await Course.findById(courseId);
    const user = await User.findById(userId);

    if (!course || !user) {
      throw new Error('Course or user not found');
    }

    // Add enrollment
    course.enrollments.push({
      student: userId,
      enrolledAt: new Date(),
      status: 'active',
      progress: {
        completedLessons: [],
        currentLesson: null,
        completionPercentage: 0,
        totalTimeSpent: 0,
        lastAccessed: new Date()
      }
    });

    // Update course stats
    course.studentsCount = course.enrollments.length;
    await course.save();

    // Update user's enrolled courses
    if (!user.enrolledCourses.includes(courseId)) {
      user.enrolledCourses.push(courseId);
      await user.save();
    }

    // Notify instructor
    await Notification.createNotification({
      recipient: course.instructor,
      type: 'course_enrollment',
      title: 'New Student Enrolled',
      message: `${user.name} has enrolled in your course "${course.title}"`,
      data: {
        courseId: course._id,
        studentId: userId,
        studentName: user.name,
        url: `/instructor/courses/${course._id}`
      }
    });

    return { success: true };
  } catch (error) {
    console.error('Enrollment error:', error);
    throw error;
  }
};

// Get payment methods available for user's country
const getPaymentMethods = async (req, res) => {
  try {
    const { country = 'CM' } = req.query;
    
    const methods = [];

    // Always include Stripe for international cards
    methods.push({
      provider: 'stripe',
      name: 'Credit/Debit Card',
      logo: '/images/stripe.png',
      type: 'card',
      currencies: ['USD', 'EUR', 'XAF']
    });

    // Add mobile money methods based on country
    const mobileMethods = mobileMoneyService.getAvailablePaymentMethods(country);
    methods.push(...mobileMethods.map(method => ({
      ...method,
      type: 'mobile_money'
    })));
