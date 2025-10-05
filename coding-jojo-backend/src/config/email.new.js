const nodemailer = require("nodemailer");

// Create reusable transporter object using SMTP
const createTransporter = () => {
  // Validate required environment variables
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error(
      "Email configuration incomplete. Please set EMAIL_USER and EMAIL_PASS in .env file"
    );
  }

  console.log("Creating email transporter with config:", {
    service: process.env.EMAIL_SERVICE || "gmail",
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: process.env.EMAIL_PORT || 587,
    user: process.env.EMAIL_USER,
    hasPassword: !!process.env.EMAIL_PASS,
  });

  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || "gmail",
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
};

// Send email function
const sendEmail = async (options) => {
  try {
    console.log(`📧 Attempting to send email to: ${options.email}`);
    const transporter = createTransporter();

    const mailOptions = {
      from: `"${process.env.EMAIL_FROM_NAME || "Coding JoJo"}" <${
        process.env.EMAIL_USER
      }>`,
      to: options.email,
      subject: options.subject,
      html: options.html,
      text: options.text,
    };

    console.log("Mail options:", {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject,
    });

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ Email send error:", error.message);
    console.error("Full error details:", error);
    throw new Error(`Email could not be sent: ${error.message}`);
  }
};

// Generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
};

// OTP email template
const getOTPEmailTemplate = (otp, userEmail) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset - CODING JOJO</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f4f4f4;
            }
            .container {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 0;
                border-radius: 15px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                overflow: hidden;
            }
            .header {
                background: rgba(255,255,255,0.1);
                padding: 30px;
                text-align: center;
                border-bottom: 1px solid rgba(255,255,255,0.2);
            }
            .logo {
                font-size: 32px;
                font-weight: bold;
                margin-bottom: 10px;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            }
            .content {
                padding: 40px 30px;
            }
            .otp-container {
                background: rgba(255,255,255,0.15);
                border-radius: 10px;
                padding: 25px;
                text-align: center;
                margin: 25px 0;
                border: 2px solid rgba(255,255,255,0.2);
            }
            .otp-code {
                font-size: 36px;
                font-weight: bold;
                letter-spacing: 8px;
                color: #fff;
                background: rgba(0,0,0,0.2);
                padding: 15px 25px;
                border-radius: 0;
                display: inline-block;
                margin: 15px 0;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
            }
            .warning {
                background: rgba(255,107,107,0.2);
                border: 1px solid rgba(255,107,107,0.5);
                border-radius: 0;
                padding: 20px;
                margin: 25px 0;
            }
            .footer {
                background: rgba(0,0,0,0.2);
                padding: 20px 30px;
                text-align: center;
                font-size: 14px;
                border-top: 1px solid rgba(255,255,255,0.1);
            }
            ol {
                text-align: left;
                padding-left: 20px;
            }
            li {
                margin: 10px 0;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">🚀 CODING JOJO</div>
                <h2>Password Reset Request</h2>
            </div>
            
            <div class="content">
                <p>Hello,</p>
                <p>We received a request to reset your password for your Coding JoJo account associated with <strong>${userEmail}</strong>.</p>
                
                <div class="otp-container">
                    <h3>Your Verification Code</h3>
                    <div class="otp-code">${otp}</div>
                    <p>This code will expire in 10 minutes</p>
                </div>
                
                <p>To complete your password reset:</p>
                <ol>
                    <li>Go back to the password reset page</li>
                    <li>Enter this verification code: <strong>${otp}</strong></li>
                    <li>Create your new password</li>
                </ol>
                
                <div class="warning">
                    <strong>⚠️ Security Notice:</strong>
                    <ul style="margin: 10px 0; padding-left: 20px;">
                        <li>This code is valid for 10 minutes only</li>
                        <li>Don't share this code with anyone</li>
                        <li>If you didn't request this reset, please ignore this email</li>
                        <li>Your password remains unchanged until you complete the reset process</li>
                    </ul>
                </div>
                
                <p>If you're having trouble, you can contact our support team or try requesting a new code.</p>
            </div>
            
            <div class="footer">
                <p>This email was sent to ${userEmail}</p>
                <p>&copy; 2025 Coding JoJo. All rights reserved.</p>
                <p>If you didn't request this email, please ignore it.</p>
            </div>
        </div>
    </body>
    </html>
  `;
};

// Password reset success email template
const getPasswordResetSuccessTemplate = (userEmail, resetTime) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset Successful - Coding JoJo</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f4f4f4;
            }
            .container {
                background: white;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 0 20px rgba(0,0,0,0.1);
            }
            .header {
                text-align: center;
                border-bottom: 2px solid #28a745;
                padding-bottom: 20px;
                margin-bottom: 30px;
            }
            .logo {
                font-size: 28px;
                font-weight: bold;
                color: #28a745;
                margin-bottom: 10px;
            }
            .success-icon {
                font-size: 48px;
                color: #28a745;
                margin: 20px 0;
            }
            .info-box {
                background: #f8f9fa;
                border: 1px solid #dee2e6;
                border-radius: 5px;
                padding: 20px;
                margin: 20px 0;
            }
            .footer {
                text-align: center;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #dee2e6;
                font-size: 14px;
                color: #6c757d;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">🚀 CODING JOJO</div>
                <h2>Password Reset Successful</h2>
                <div class="success-icon">✅</div>
            </div>
            
            <p>Hello,</p>
            <p>Your password has been successfully reset for your Coding JoJo account associated with <strong>${userEmail}</strong>.</p>
            
            <div class="info-box">
                <h4>Reset Details:</h4>
                <p><strong>Account:</strong> ${userEmail}</p>
                <p><strong>Reset Time:</strong> ${resetTime}</p>
                <p><strong>Status:</strong> ✅ Successful</p>
            </div>
            
            <p>You can now log in to your account using your new password.</p>
            
            <p><strong>⚠️ Security Notice:</strong></p>
            <ul>
                <li>If you did not initiate this password reset, please contact our support team immediately</li>
                <li>Consider enabling two-factor authentication for additional security</li>
                <li>Never share your password with anyone</li>
            </ul>
            
            <div class="footer">
                <p>This email was sent to ${userEmail}</p>
                <p>&copy; 2025 Coding JoJo. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
  `;
};

module.exports = {
  sendEmail,
  generateOTP,
  getOTPEmailTemplate,
  getPasswordResetSuccessTemplate,
};
