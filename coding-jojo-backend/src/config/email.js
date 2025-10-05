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
                line-height: 1.5;
                color: #333;
                margin: 0;
                padding: 20px;
                background-color: #f8f9fa;
            }
            .container {
                max-width: 480px;
                margin: 0 auto;
                background: white;
                box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                overflow: hidden;
            }
            .header {
                background: linear-gradient(135deg, #ec4899 0%, #f97316 100%);
                color: white;
                padding: 20px;
                text-align: center;
            }
            .logo {
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 8px;
                text-align: center;
            }
          
            .content {
                padding: 24px;
            }
            .greeting {
                font-size: 18px;
                font-weight: 600;
                color: #1f2937;
                margin-bottom: 16px;
            }
            .message {
                color: #6b7280;
                margin-bottom: 20px;
                font-size: 14px;
            }
            .otp-container {
                background: linear-gradient(135deg, #fef3f2 0%, #fff7ed 100%);
                border: 2px solid #fed7cc;
                padding: 20px;
                text-align: center;
                margin: 20px 0;
            }
            .otp-label {
                font-size: 14px;
                font-weight: 600;
                color: #ea580c;
                margin-bottom: 8px;
            }
            .otp-code {
                font-size: 28px;
                font-weight: bold;
                letter-spacing: 6px;
                color: #dc2626;
                background: white;
                padding: 12px 20px;
                display: inline-block;
                margin: 8px 0;
                border: 1px solid #fed7cc;
            }
            .otp-expiry {
                font-size: 12px;
                color: #ea580c;
                font-weight: 500;
            }
            .steps {
                background: #f9fafb;
                padding: 16px;
                margin: 16px 0;
            }
            .steps-title {
                font-size: 14px;
                font-weight: 600;
                color: #374151;
                margin-bottom: 8px;
            }
            .steps ol {
                margin: 0;
                padding-left: 16px;
                font-size: 13px;
                color: #6b7280;
            }
            .steps li {
                margin: 4px 0;
            }
            .warning {
                background: #fef2f2;
                border: 1px solid #fecaca;
                padding: 12px;
                margin: 16px 0;
            }
            .warning-title {
                font-size: 13px;
                font-weight: 600;
                color: #dc2626;
                margin-bottom: 6px;
            }
            .warning ul {
                margin: 0;
                padding-left: 16px;
                font-size: 12px;
                color: #7f1d1d;
            }
            .warning li {
                margin: 2px 0;
            }
            .footer {
                background: #f9fafb;
                padding: 16px 24px;
                text-align: center;
                border-top: 1px solid #e5e7eb;
            }
            .footer p {
                margin: 4px 0;
                font-size: 12px;
                color: #9ca3af;
            }
            .help-text {
                font-size: 13px;
                color: #6b7280;
                text-align: center;
                margin-top: 16px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">
                    🚀 CODING JOJO
                </div>
                <div style="font-size: 16px; margin-top: 4px;">Password Reset Request</div>
            </div>
            
            <div class="content">
                <div class="greeting">Hello!</div>
                <div class="message">
                    We received a request to reset your password for your Coding JoJo account (<strong>${userEmail}</strong>).
                </div>
                
                <div class="otp-container">
                    <div class="otp-label">Your Verification Code</div>
                    <div class="otp-code">${otp}</div>
                    <div class="otp-expiry">Expires in 10 minutes</div>
                </div>
                
                <div class="steps">
                    <div class="steps-title">To reset your password:</div>
                    <ol>
                        <li>Return to the password reset page</li>
                        <li>Enter the code: <strong>${otp}</strong></li>
                        <li>Create your new password</li>
                    </ol>
                </div>
                
                <div class="warning">
                    <div class="warning-title">🔒 Security Notice</div>
                    <ul>
                        <li>This code expires in 10 minutes</li>
                        <li>Never share this code with anyone</li>
                        <li>If you didn't request this, ignore this email</li>
                    </ul>
                </div>
                
                <div class="help-text">
                    Having trouble? Contact our support team for assistance.
                </div>
            </div>
            
            <div class="footer">
                <p>This email was sent to ${userEmail}</p>
                <p>&copy; 2025 Coding JoJo. All rights reserved.</p>
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
                line-height: 1.5;
                color: #333;
                margin: 0;
                padding: 20px;
                background-color: #f8f9fa;
            }
            .container {
                max-width: 480px;
                margin: 0 auto;
                background: white;
                box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                overflow: hidden;
            }
            .header {
                background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                color: white;
                padding: 20px;
                text-align: center;
            }
           .logo {
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 8px;
                text-align: center;
            }
            .logo-icon {
                display: inline-block;
                width: 32px;
                height: 32px;
                background: white;
                border-radius: 50%;
                color: #10b981;
                font-size: 18px;
                font-weight: bold;
                line-height: 32px;
                text-align: center;
            }
            .success-icon {
                font-size: 32px;
                margin: 8px 0;
            }
            .content {
                padding: 24px;
            }
            .greeting {
                font-size: 18px;
                font-weight: 600;
                color: #1f2937;
                margin-bottom: 16px;
            }
            .message {
                color: #6b7280;
                margin-bottom: 20px;
                font-size: 14px;
            }
            .info-box {
                background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);
                border: 2px solid #bbf7d0;
                padding: 16px;
                margin: 16px 0;
            }
            .info-title {
                font-size: 14px;
                font-weight: 600;
                color: #065f46;
                margin-bottom: 8px;
            }
            .info-item {
                display: flex;
                justify-content: space-between;
                margin: 4px 0;
                font-size: 13px;
            }
            .info-label {
                color: #374151;
                font-weight: 500;
            }
            .info-value {
                color: #059669;
                font-weight: 600;
            }
            .warning {
                background: #fef2f2;
                border: 1px solid #fecaca;
                padding: 12px;
                margin: 16px 0;
            }
            .warning-title {
                font-size: 13px;
                font-weight: 600;
                color: #dc2626;
                margin-bottom: 6px;
            }
            .warning ul {
                margin: 0;
                padding-left: 16px;
                font-size: 12px;
                color: #7f1d1d;
            }
            .warning li {
                margin: 2px 0;
            }
            .cta-button {
                display: inline-block;
                background: linear-gradient(135deg, #ec4899 0%, #f97316 100%);
                color: white;
                padding: 12px 24px;
                text-decoration: none;
                font-weight: 600;
                font-size: 14px;
                margin: 16px 0;
                text-align: center;
            }
            .footer {
                background: #f9fafb;
                padding: 16px 24px;
                text-align: center;
                border-top: 1px solid #e5e7eb;
            }
            .footer p {
                margin: 4px 0;
                font-size: 12px;
                color: #9ca3af;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                 <div class="logo">
                    🚀 CODING JOJO
                </div>
                <div style="font-size: 16px; margin-top: 4px;">Password Reset Successful</div>
                <div class="success-icon">✅</div>
            </div>
            
            <div class="content">
                <div class="greeting">Success!</div>
                <div class="message">
                    Your password has been successfully reset for your Coding JoJo account (<strong>${userEmail}</strong>).
                </div>
                
                <div class="info-box">
                    <div class="info-title">Reset Details</div>
                    <div class="info-item">
                        <span class="info-label">Account:</span>
                        <span class="info-value">${userEmail}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Reset Time:</span>
                        <span class="info-value">${resetTime}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Status:</span>
                        <span class="info-value">✅ Successful</span>
                    </div>
                </div>
                
                <div style="text-align: center;">
                    <a href="${process.env.FRONTEND_URL}/login" class="cta-button">
                        Login to Your Account
                    </a>
                </div>
                
                <div class="warning">
                    <div class="warning-title">🔒 Security Notice</div>
                    <ul>
                        <li>If you didn't initiate this reset, contact support immediately</li>
                        <li>Consider enabling two-factor authentication</li>
                        <li>Never share your password with anyone</li>
                    </ul>
                </div>
            </div>
            
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
