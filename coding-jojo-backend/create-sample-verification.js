const mongoose = require('mongoose');
const InstructorVerification = require('./src/models/InstructorVerification');
const User = require('./src/models/User');

async function createSampleData() {
  try {
    await mongoose.connect('mongodb://localhost:27017/codingjojo', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to database');

    // Check if we have any verification records
    const count = await InstructorVerification.countDocuments();
    console.log('Current verification records:', count);

    // Find a user to use as instructor
    const user = await User.findOne({ role: { $ne: 'admin' } });
    if (!user) {
      console.log('No users found. Need to create some users first.');
      process.exit(1);
    }

    console.log('Found user:', user.name || user.email);

    if (count === 0) {
      // Create a sample verification record
      const verification = new InstructorVerification({
        instructor: user._id,
        verificationStatus: 'pending_review',
        progressPercentage: 100,
        completedSteps: {
          email: true,
          phone: true,
          personalInfo: true,
          idDocument: true,
          selfie: true
        },
        emailVerification: {
          isVerified: true,
          verifiedAt: new Date()
        },
        phoneVerification: {
          isVerified: true,
          verifiedAt: new Date()
        },
        personalInfo: {
          firstName: 'John',
          lastName: 'Instructor',
          dateOfBirth: new Date('1990-01-01'),
          phoneNumber: '+1234567890',
          address: {
            street: '123 Main St',
            city: 'New York',
            state: 'NY',
            postalCode: '10001',
            country: 'US'
          }
        },
        documents: {
          idDocument: {
            filename: 'id-document.jpg',
            originalName: 'ID Document.jpg',
            mimeType: 'image/jpeg',
            size: 1024000,
            url: 'https://example.com/id-document.jpg',
            publicId: 'verification/id-123',
            uploadedAt: new Date()
          },
          selfie: {
            filename: 'selfie.jpg',
            originalName: 'Selfie.jpg',
            mimeType: 'image/jpeg',
            size: 512000,
            url: 'https://example.com/selfie.jpg',
            publicId: 'verification/selfie-123',
            uploadedAt: new Date()
          }
        },
        currentStep: 'verification_review',
        submissionHistory: [{
          step: 'email_verification',
          submittedAt: new Date(Date.now() - 86400000 * 5),
          status: 'completed'
        }],
        lastActivity: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      });

      await verification.save();
      console.log('Sample verification record created');
    } else {
      console.log('Verification records already exist, skipping creation');
    }

    await mongoose.disconnect();
    console.log('Done');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

createSampleData();
