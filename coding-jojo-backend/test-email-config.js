const nodemailer = require('nodemailer');
require('dotenv').config();

// Test email configuration
async function testEmailSending() {
  console.log('🧪 Testing Email Configuration');
  console.log('Environment Variables:');
  console.log('SMTP_HOST:', process.env.SMTP_HOST);
  console.log('SMTP_PORT:', process.env.SMTP_PORT);
  console.log('SMTP_USER:', process.env.SMTP_USER);
  console.log('SMTP_PASS:', process.env.SMTP_PASS ? 'SET' : 'NOT SET');
  console.log('FROM_NAME:', process.env.FROM_NAME);
  console.log('FROM_EMAIL:', process.env.FROM_EMAIL);

  try {
    // Create transporter with the same config as sendEmail.js
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    console.log('✅ Transporter created');

    // Test connection
    await transporter.verify();
    console.log('✅ SMTP connection verified');

    // Send test email
    const testEmail = {
      from: `${process.env.FROM_NAME || 'Coding Jojo'} <${process.env.FROM_EMAIL || process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER, // Send to yourself for testing
      subject: 'Test Email - Coding Jojo Verification System',
      html: `
        <h2>Email Test Successful!</h2>
        <p>Your email configuration is working correctly.</p>
        <p>Test verification code: <strong>123456</strong></p>
        <p>Time: ${new Date().toISOString()}</p>
      `
    };

    const info = await transporter.sendMail(testEmail);
    console.log('✅ Test email sent successfully!');
    console.log('Message ID:', info.messageId);
    console.log('Response:', info.response);

  } catch (error) {
    console.error('❌ Email test failed:');
    console.error('Error type:', error.constructor.name);
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    if (error.response) {
      console.error('SMTP Response:', error.response);
    }
    console.error('Full error:', error);
  }
}

testEmailSending();
