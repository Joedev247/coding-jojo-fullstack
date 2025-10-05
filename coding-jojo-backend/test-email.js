require("dotenv").config();
const { sendEmail, getOTPEmailTemplate } = require("./src/config/email");

async function testEmail() {
  try {
    console.log("🔄 Testing email configuration...");
    console.log("Email config:");
    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log("EMAIL_FROM:", process.env.EMAIL_FROM);
    console.log("EMAIL_HOST:", process.env.EMAIL_HOST);
    console.log("EMAIL_PORT:", process.env.EMAIL_PORT);
    console.log(
      "EMAIL_PASS:",
      process.env.EMAIL_PASS ? "***configured***" : "not configured"
    );

    const testOTP = "123456";
    const testEmail = "your-email@gmail.com"; // Change this to your email for testing

    const emailTemplate = getOTPEmailTemplate(testOTP, testEmail);

    console.log("\n📧 Sending test email...");
    const result = await sendEmail({
      email: testEmail,
      subject: "Test Email - Password Reset Code",
      html: emailTemplate,
      text: `Your test password reset code is: ${testOTP}`,
    });

    console.log("✅ Email sent successfully:", result);
  } catch (error) {
    console.error("❌ Email test failed:", error.message);
    console.error("Full error:", error);
  }
}

testEmail();
