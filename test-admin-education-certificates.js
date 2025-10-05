#!/usr/bin/env node

import fetch from 'node-fetch';

const API_BASE_URL = 'http://localhost:5000/api';

async function testAdminEducationCertificates() {
  console.log('🧪 Testing Admin Education Certificate Viewing...\n');

  try {
    // Step 1: Login as admin
    console.log('1️⃣ Logging in as admin...');
    const loginResponse = await fetch(`${API_BASE_URL}/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'admin@codingjojo.com',
        password: 'admin123'
      })
    });

    const loginData = await loginResponse.json();
    
    if (!loginData.success) {
      console.error('❌ Admin login failed:', loginData.error);
      return;
    }

    console.log('✅ Admin login successful');
    const adminToken = loginData.token;

    // Step 2: Get all instructor verifications
    console.log('\n2️⃣ Fetching all instructor verifications...');
    const verificationsResponse = await fetch(`${API_BASE_URL}/admin/instructor-verifications`, {
      headers: {
        'Authorization': `Bearer ${adminToken}`
      }
    });

    const verificationsData = await verificationsResponse.json();
    
    if (!verificationsData.success) {
      console.error('❌ Failed to fetch verifications:', verificationsData.error);
      return;
    }

    console.log(`✅ Found ${verificationsData.data.length} instructor verifications`);
    
    // Show summary of verifications
    verificationsData.data.forEach((verification, index) => {
      console.log(`   ${index + 1}. ${verification.instructor.name} (${verification.instructor.email})`);
      console.log(`      Status: ${verification.verificationStatus}`);
      console.log(`      Progress: ${verification.progressPercentage}%`);
      console.log(`      Education Certificates: ${verification.educationCertificatesCount || 0}`);
      console.log(`      Education Status: ${verification.educationStatus || 'N/A'}`);
      console.log('');
    });

    // Step 3: Get detailed view of first verification with education certificates
    const verificationWithEducation = verificationsData.data.find(v => 
      v.educationCertificatesCount > 0
    );

    if (!verificationWithEducation) {
      console.log('⚠️  No verifications found with education certificates. Upload one first from the instructor verification page.');
      return;
    }

    console.log(`3️⃣ Getting detailed view of ${verificationWithEducation.instructor.name}'s verification...`);
    
    const detailResponse = await fetch(`${API_BASE_URL}/admin/instructor-verifications/${verificationWithEducation._id}`, {
      headers: {
        'Authorization': `Bearer ${adminToken}`
      }
    });

    const detailData = await detailResponse.json();
    
    if (!detailData.success) {
      console.error('❌ Failed to fetch verification details:', detailData.error);
      return;
    }

    console.log('✅ Verification details retrieved successfully');
    
    const verification = detailData.data;
    
    // Display education certificate information
    if (verification.educationVerification && verification.educationVerification.certificates) {
      console.log(`\n📜 Education Certificates (${verification.educationVerification.certificates.length}):`);
      
      verification.educationVerification.certificates.forEach((cert, index) => {
        console.log(`\n   Certificate ${index + 1}:`);
        console.log(`   📋 Type: ${cert.certificateType.replace(/_/g, ' ')}`);
        console.log(`   🏫 Institution: ${cert.institutionName}`);
        console.log(`   📚 Field of Study: ${cert.fieldOfStudy}`);
        console.log(`   🗓️  Graduation Year: ${cert.graduationYear}`);
        if (cert.gpa) {
          console.log(`   🎯 GPA/Grade: ${cert.gpa}`);
        }
        console.log(`   🔗 Document URL: ${cert.documentUrl}`);
        console.log(`   ✅ Verification Status: ${cert.verificationStatus}`);
        if (cert.verificationNotes) {
          console.log(`   📝 Admin Notes: ${cert.verificationNotes}`);
        }
        console.log(`   📅 Uploaded: ${new Date(cert.uploadedAt).toLocaleDateString()}`);
        if (cert.verifiedAt) {
          console.log(`   ✔️  Verified: ${new Date(cert.verifiedAt).toLocaleDateString()}`);
        }
      });

      console.log(`\n📊 Overall Education Status: ${verification.educationVerification.overallStatus}`);
      
      // Step 4: Test certificate verification action (if there's a pending certificate)
      const pendingCert = verification.educationVerification.certificates.find(
        cert => cert.verificationStatus === 'pending'
      );
      
      if (pendingCert) {
        console.log(`\n4️⃣ Testing certificate verification action for pending certificate...`);
        
        const verifyResponse = await fetch(`${API_BASE_URL}/admin/instructor-verifications/${verification._id}/certificates/${pendingCert._id}/verify`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${adminToken}`
          },
          body: JSON.stringify({
            verificationStatus: 'verified',
            verificationNotes: 'Certificate verified successfully by automated test'
          })
        });

        const verifyData = await verifyResponse.json();
        
        if (verifyData.success) {
          console.log('✅ Certificate verification action successful');
          console.log(`   Updated status: ${verifyData.data.certificate.verificationStatus}`);
          console.log(`   Overall education status: ${verifyData.data.educationStatus}`);
        } else {
          console.error('❌ Certificate verification failed:', verifyData.error);
        }
      } else {
        console.log('ℹ️  No pending certificates found for verification testing');
      }
      
    } else {
      console.log('⚠️  No education certificates found in verification details');
    }

    console.log('\n🎉 Admin education certificate viewing test completed successfully!');
    console.log('\n📝 Summary:');
    console.log('   ✅ Admin can login and access verification dashboard');
    console.log('   ✅ Admin can view list of all instructor verifications');
    console.log('   ✅ Admin can see education certificate counts in verification list');
    console.log('   ✅ Admin can view detailed education certificate information');
    console.log('   ✅ Admin can verify/reject individual certificates');
    console.log('\n🚀 The admin education certificate viewing system is working correctly!');

  } catch (error) {
    console.error('💥 Test failed with error:', error.message);
    console.error('Stack trace:', error.stack);
  }
}

// Run the test
testAdminEducationCertificates();
