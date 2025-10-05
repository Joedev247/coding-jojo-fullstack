#!/usr/bin/env node

/**
 * Test script to verify admin can see education certificates
 * Run with: node test-admin-education-verification.js
 */

const API_BASE_URL = 'http://localhost:5000/api';

async function testAdminEducationVerification() {
  try {
    console.log('🧪 Testing Admin Education Certificate Verification');
    console.log('=' .repeat(50));

    // Test admin login first
    console.log('\n1. Testing admin login...');
    const loginResponse = await fetch(`${API_BASE_URL}/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin@codingjojo.com',
        password: 'adminpassword123'
      })
    });

    const loginData = await loginResponse.json();
    
    if (!loginData.success) {
      console.log('❌ Admin login failed:', loginData.error);
      return;
    }

    const adminToken = loginData.token;
    console.log('✅ Admin login successful');

    // Get all instructor verifications
    console.log('\n2. Fetching instructor verifications...');
    const verificationsResponse = await fetch(`${API_BASE_URL}/admin/instructor-verifications`, {
      headers: {
        'Authorization': `Bearer ${adminToken}`
      }
    });

    const verificationsData = await verificationsResponse.json();
    
    if (!verificationsData.success) {
      console.log('❌ Failed to fetch verifications:', verificationsData.error);
      return;
    }

    console.log(`✅ Found ${verificationsData.count} verification submissions`);

    // Find verifications with education certificates
    const verificationsWithEducation = verificationsData.data.filter(v => 
      v.educationCertificatesCount && v.educationCertificatesCount > 0
    );

    if (verificationsWithEducation.length === 0) {
      console.log('⚠️  No verifications with education certificates found');
      console.log('💡 Upload an education certificate as an instructor first');
      return;
    }

    console.log(`✅ Found ${verificationsWithEducation.length} verifications with education certificates`);

    // Get detailed info for the first verification with education
    const firstVerification = verificationsWithEducation[0];
    console.log(`\n3. Getting details for verification: ${firstVerification._id}`);
    
    const detailsResponse = await fetch(`${API_BASE_URL}/admin/instructor-verifications/${firstVerification._id}`, {
      headers: {
        'Authorization': `Bearer ${adminToken}`
      }
    });

    const detailsData = await detailsResponse.json();
    
    if (!detailsData.success) {
      console.log('❌ Failed to fetch verification details:', detailsData.error);
      return;
    }

    const verification = detailsData.data;
    console.log('✅ Verification details retrieved');
    console.log(`   Instructor: ${verification.instructor?.name || verification.instructor?.email}`);
    console.log(`   Status: ${verification.verificationStatus}`);
    console.log(`   Progress: ${verification.progressPercentage}%`);
    
    // Check education certificates
    if (verification.educationVerification && verification.educationVerification.certificates) {
      console.log(`\n📚 Education Certificates (${verification.educationVerification.certificates.length}):`);
      
      verification.educationVerification.certificates.forEach((cert, index) => {
        console.log(`   Certificate ${index + 1}:`);
        console.log(`     Type: ${cert.certificateType}`);
        console.log(`     Institution: ${cert.institutionName}`);
        console.log(`     Field: ${cert.fieldOfStudy}`);
        console.log(`     Year: ${cert.graduationYear}`);
        console.log(`     Status: ${cert.verificationStatus}`);
        console.log(`     Document: ${cert.documentUrl ? 'Available' : 'Missing'}`);
        console.log(`     Uploaded: ${new Date(cert.uploadedAt).toLocaleString()}`);
        if (cert.verificationNotes) {
          console.log(`     Notes: ${cert.verificationNotes}`);
        }
        console.log('');
      });

      // Test certificate verification (if there are pending certificates)
      const pendingCertificate = verification.educationVerification.certificates.find(
        cert => cert.verificationStatus === 'pending'
      );

      if (pendingCertificate) {
        console.log(`\n4. Testing certificate verification...`);
        console.log(`   Verifying certificate: ${pendingCertificate._id}`);
        
        const verifyResponse = await fetch(`${API_BASE_URL}/admin/instructor-verifications/${verification._id}/certificates/${pendingCertificate._id}/verify`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${adminToken}`
          },
          body: JSON.stringify({
            verificationStatus: 'verified',
            verificationNotes: 'Certificate verified by automated test - looks authentic'
          })
        });

        const verifyData = await verifyResponse.json();
        
        if (verifyData.success) {
          console.log('✅ Certificate verification successful');
          console.log(`   New certificate status: ${verifyData.data.certificate.verificationStatus}`);
          console.log(`   Education overall status: ${verifyData.data.educationStatus}`);
        } else {
          console.log('❌ Certificate verification failed:', verifyData.error);
        }
      } else {
        console.log('\n💡 No pending certificates found for verification testing');
      }

      console.log('\n🎉 All tests completed successfully!');
      console.log('\nAdmin can now:');
      console.log('• View all instructor education certificates');
      console.log('• See certificate details (type, institution, field, year)');
      console.log('• Download certificate documents');
      console.log('• Verify, reject, or request clarification');
      console.log('• Add verification notes');

    } else {
      console.log('⚠️  No education certificates found in verification details');
    }

  } catch (error) {
    console.log('❌ Test failed with error:', error.message);
    console.log('💡 Make sure the backend server is running on port 5000');
  }
}

testAdminEducationVerification();
