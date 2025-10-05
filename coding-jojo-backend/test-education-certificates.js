#!/usr/bin/env node

const mongoose = require('mongoose');
const InstructorVerification = require('./src/models/InstructorVerification');
const User = require('./src/models/User');
require('dotenv').config();

async function testEducationCertificates() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/coding-jojo');
    console.log('✅ Connected to MongoDB');

    // Find a test user (instructor)
    let testUser = await User.findOne({ email: { $regex: 'test.*instructor', $options: 'i' } });
    
    if (!testUser) {
      // Create a test instructor user
      testUser = new User({
        name: 'Test Instructor',
        email: 'test.instructor@example.com',
        password: 'hashedpassword123',
        role: 'teacher' // Will be updated to instructor after verification
      });
      await testUser.save();
      console.log('📝 Created test instructor user:', testUser.email);
    } else {
      console.log('👤 Found existing test user:', testUser.email);
    }

    // Find or create verification record
    let verification = await InstructorVerification.findOne({ instructor: testUser._id });
    
    if (!verification) {
      verification = new InstructorVerification({
        instructor: testUser._id,
        phoneVerification: {
          phoneNumber: '+1234567890',
          isVerified: true
        },
        emailVerification: {
          isVerified: true
        },
        personalInfo: {
          firstName: 'Test',
          lastName: 'Instructor',
          dateOfBirth: new Date('1990-01-01')
        },
        completedSteps: {
          email: true,
          phone: true,
          personalInfo: true,
          idDocument: true,
          selfie: true,
          educationCertificate: false
        }
      });
      await verification.save();
      console.log('📋 Created verification record');
    } else {
      console.log('📋 Found existing verification record');
    }

    // Test 1: Add education certificates
    console.log('\n🧪 TEST 1: Adding Education Certificates');
    
    const sampleCertificates = [
      {
        certificateType: 'bachelors_degree',
        institutionName: 'Harvard University',
        fieldOfStudy: 'Computer Science',
        graduationYear: 2015,
        gpa: 3.8,
        certificateDocument: {
          url: 'https://example.com/harvard-cs-degree.pdf',
          publicId: 'sample_cert_1',
          uploadedAt: new Date(),
          fileSize: 1024000,
          mimeType: 'application/pdf'
        },
        verificationStatus: 'pending'
      },
      {
        certificateType: 'masters_degree',
        institutionName: 'MIT',
        fieldOfStudy: 'Software Engineering',
        graduationYear: 2017,
        gpa: 3.9,
        certificateDocument: {
          url: 'https://example.com/mit-se-masters.pdf',
          publicId: 'sample_cert_2',
          uploadedAt: new Date(),
          fileSize: 2048000,
          mimeType: 'application/pdf'
        },
        verificationStatus: 'pending'
      },
      {
        certificateType: 'professional_certification',
        institutionName: 'Amazon Web Services',
        fieldOfStudy: 'Cloud Architecture',
        graduationYear: 2020,
        certificateDocument: {
          url: 'https://example.com/aws-cert.pdf',
          publicId: 'sample_cert_3',
          uploadedAt: new Date(),
          fileSize: 512000,
          mimeType: 'application/pdf'
        },
        verificationStatus: 'pending'
      }
    ];

    // Initialize education verification if it doesn't exist
    if (!verification.educationVerification) {
      verification.educationVerification = {
        certificates: [],
        minimumRequirementMet: false,
        overallStatus: 'pending'
      };
    }

    // Add certificates
    verification.educationVerification.certificates = sampleCertificates;
    
    // Test the education requirements check
    const requirementsCheck = verification.checkEducationRequirements();
    console.log('📊 Education Requirements Check:', requirementsCheck);

    // Update education status
    verification.updateEducationStatus();
    console.log('🎯 Education Status Updated:', verification.educationVerification.overallStatus);
    console.log('✅ Requirements Met:', verification.educationVerification.minimumRequirementMet);
    console.log('📜 Certificates Count:', verification.educationVerification.certificates.length);

    await verification.save();

    // Test 2: Verify certificates (simulate admin action)
    console.log('\n🧪 TEST 2: Simulating Admin Certificate Verification');
    
    // Verify first two certificates
    verification.educationVerification.certificates[0].verificationStatus = 'verified';
    verification.educationVerification.certificates[0].verifiedAt = new Date();
    verification.educationVerification.certificates[0].verificationNotes = 'Valid Harvard degree verified through official transcript.';

    verification.educationVerification.certificates[1].verificationStatus = 'verified';
    verification.educationVerification.certificates[1].verifiedAt = new Date();
    verification.educationVerification.certificates[1].verificationNotes = 'MIT masters degree confirmed.';

    // Reject the third certificate for testing
    verification.educationVerification.certificates[2].verificationStatus = 'rejected';
    verification.educationVerification.certificates[2].verifiedAt = new Date();
    verification.educationVerification.certificates[2].rejectionReason = 'Certificate image is not clear. Please upload a higher quality version.';

    // Update status again
    verification.updateEducationStatus();
    await verification.save();

    console.log('✅ Verified certificates:', verification.educationVerification.certificates.filter(cert => cert.verificationStatus === 'verified').length);
    console.log('❌ Rejected certificates:', verification.educationVerification.certificates.filter(cert => cert.verificationStatus === 'rejected').length);
    console.log('⏳ Pending certificates:', verification.educationVerification.certificates.filter(cert => cert.verificationStatus === 'pending').length);

    // Test 3: Check if verification is complete
    console.log('\n🧪 TEST 3: Checking Verification Completion');
    
    const isComplete = verification.isVerificationComplete();
    console.log('🎯 Is Verification Complete:', isComplete);
    console.log('📊 Progress Percentage:', verification.progressPercentage);
    
    // Test requirements check again
    const finalRequirementsCheck = verification.checkEducationRequirements();
    console.log('🎓 Final Education Requirements Check:', finalRequirementsCheck);

    // Test 4: Display verification summary
    console.log('\n📋 VERIFICATION SUMMARY');
    console.log('='.repeat(50));
    console.log(`👤 Instructor: ${testUser.name} (${testUser.email})`);
    console.log(`🏷️  Status: ${verification.verificationStatus}`);
    console.log(`📈 Progress: ${verification.progressPercentage}%`);
    console.log(`🎓 Education Status: ${verification.educationVerification.overallStatus}`);
    console.log(`✅ Requirements Met: ${verification.educationVerification.minimumRequirementMet}`);
    
    console.log('\n📚 EDUCATION CERTIFICATES:');
    verification.educationVerification.certificates.forEach((cert, index) => {
      console.log(`  ${index + 1}. ${cert.certificateType.replace('_', ' ').toUpperCase()}`);
      console.log(`     Institution: ${cert.institutionName}`);
      console.log(`     Field: ${cert.fieldOfStudy}`);
      console.log(`     Year: ${cert.graduationYear}`);
      console.log(`     Status: ${cert.verificationStatus.toUpperCase()}`);
      if (cert.verificationNotes) {
        console.log(`     Notes: ${cert.verificationNotes}`);
      }
      if (cert.rejectionReason) {
        console.log(`     Rejection Reason: ${cert.rejectionReason}`);
      }
      console.log('');
    });

    console.log('\n🎉 Education Certificate System Test Completed Successfully!');
    
  } catch (error) {
    console.error('❌ Test Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run the test
testEducationCertificates();
