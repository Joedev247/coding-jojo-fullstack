const Transaction = require('../models/Transaction');
const Course = require('../models/Course');
const User = require('../models/User');
const Notification = require('../models/Notification');
const InstructorEarnings = require('../models/InstructorEarnings');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy');

// Initialize payment
const initializePayment = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      courseId,
      paymentMethod = 'stripe',
      amount,
      currency = 'XAF',
      phoneNumber,
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

    // Generate transaction reference
    const reference = `CJ_${courseId.substring(0, 8)}_${userId.substring(0, 8)}_${Date.now()}`;

    // Create transaction record
    const transaction = new Transaction({
      user: userId,
      course: courseId,
      amount: parseFloat(amount),
      currency,
      type: 'course_purchase',
      status: 'pending',
      reference,
      description: `Course purchase: ${course.title}`,
      metadata: {
        courseTitle: course.title,
        userEmail: req.user.email,
        phoneNumber,
        country,
        paymentMethod
      }
    });

    await transaction.save();

    let paymentResult;

    // Process payment based on method
    if (paymentMethod === 'stripe') {
      paymentResult = await processStripePayment({
        amount: amount * 100, // Stripe uses cents
        currency: currency.toLowerCase(),
        reference,
        courseId,
        userId,
        userEmail: req.user.email
      });
    } else {
      // For mobile money methods, return success for now
      paymentResult = {
        success: true,
        transactionId: `mobile_${Date.now()}`,
        paymentUrl: `${process.env.FRONTEND_URL}/payment/mobile?ref=${reference}`
      };
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
    await transaction.save();

    res.json({
      success: true,
      data: {
        transactionId: transaction._id,
        reference,
        paymentUrl: paymentResult.paymentUrl,
        clientSecret: paymentResult.clientSecret,
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

// Verify payment status
const verifyPayment = async (req, res) => {
  try {
    const { transactionId } = req.params;
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

    // For stripe payments, verify with Stripe
    if (transaction.metadata.paymentMethod === 'stripe' && transaction.providerTransactionId) {
      const paymentIntent = await stripe.paymentIntents.retrieve(
        transaction.providerTransactionId
      );

      if (paymentIntent.status === 'succeeded') {
        // Update transaction
        transaction.status = 'completed';
        transaction.completedAt = new Date();
        await transaction.save();

        // Enroll user in course
        await enrollUserInCourse(transaction.user, transaction.course._id);

        // Create instructor earnings record
        await createInstructorEarnings(transaction);

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
            status: paymentIntent.status,
            transaction
          }
        });
      }
    } else {
      // For other payment methods, return current status
      res.json({
        success: true,
        data: {
          status: transaction.status,
          transaction
        }
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

    // Check if already enrolled
    const existingEnrollment = course.enrollments.find(
      enrollment => enrollment.student && enrollment.student.toString() === userId.toString()
    );

    if (!existingEnrollment) {
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
    }

    // Update user's enrolled courses
    if (!user.enrolledCourses.includes(courseId)) {
      user.enrolledCourses.push(courseId);
      await user.save();
    }

    // Notify instructor
    if (course.instructor && course.instructor.toString() !== userId.toString()) {
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
    }

    return { success: true };
  } catch (error) {
    console.error('Enrollment error:', error);
    throw error;
  }
};

// Helper function to create instructor earnings
const createInstructorEarnings = async (transaction) => {
  try {
    // Get course with instructor details
    const course = await Course.findById(transaction.course)
      .populate('instructor', '_id name email');
    
    if (!course || !course.instructor) {
      console.error('Course or instructor not found for earnings creation');
      return;
    }

    const platformFeePercentage = 20; // 20% platform fee
    const grossAmount = transaction.amount;
    const platformFee = Math.round((grossAmount * platformFeePercentage) / 100);
    const netAmount = grossAmount - platformFee;

    // Create earnings record
    const earnings = new InstructorEarnings({
      instructor: course.instructor._id,
      course: course._id,
      transaction: transaction._id,
      student: transaction.user,
      grossAmount,
      platformFee,
      netAmount,
      currency: transaction.currency,
      paymentStatus: 'pending', // Will be paid out later by admin
      metadata: {
        platformFeePercentage,
        refunded: false
      }
    });

    await earnings.save();
    
    console.log(`Instructor earnings created: ${netAmount} ${transaction.currency} for instructor ${course.instructor.name}`);
    
  } catch (error) {
    console.error('Error creating instructor earnings:', error);
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
    switch (country) {
      case 'CM': // Cameroon
        methods.push(
          { provider: 'orange', name: 'Orange Money', logo: '/images/orange-money.png', type: 'mobile_money' },
          { provider: 'mtn', name: 'MTN Mobile Money', logo: '/images/mtn-momo.png', type: 'mobile_money' }
        );
        break;
      case 'GH': // Ghana
        methods.push(
          { provider: 'mtn', name: 'MTN Mobile Money', logo: '/images/mtn-momo.png', type: 'mobile_money' }
        );
        break;
      case 'UG': // Uganda
        methods.push(
          { provider: 'mtn', name: 'MTN Mobile Money', logo: '/images/mtn-momo.png', type: 'mobile_money' },
          { provider: 'airtel', name: 'Airtel Money', logo: '/images/airtel-money.png', type: 'mobile_money' }
        );
        break;
    }

    res.json({
      success: true,
      data: methods
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get user's payment history
const getPaymentHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 10, status, paymentMethod } = req.query;

    const query = { user: userId };
    if (status) query.status = status;
    if (paymentMethod) query['metadata.paymentMethod'] = paymentMethod;

    const transactions = await Transaction.find(query)
      .populate('course', 'title thumbnail')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Transaction.countDocuments(query);

    res.json({
      success: true,
      data: {
        transactions,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Create payment intent (legacy method)
const createPaymentIntent = async (req, res) => {
  return initializePayment(req, res);
};

// Process payment (legacy method)
const processPayment = async (req, res) => {
  return verifyPayment(req, res);
};

module.exports = {
  initializePayment,
  verifyPayment,
  getPaymentMethods,
  getPaymentHistory,
  enrollUserInCourse,
  createPaymentIntent,
  processPayment
};
