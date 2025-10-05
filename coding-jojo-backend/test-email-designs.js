require("dotenv").config();
const {
  sendEmail,
  getOTPEmailTemplate,
  getPasswordResetSuccessTemplate,
} = require("./src/config/email");

async function testBothEmails() {
  try {
    console.log("🔄 Testing new email designs...");

    const testEmail = "your-email@gmail.com"; // Change this to your email for testing
    const testOTP = "123456";
    const resetTime = new Date().toLocaleString("en-US", {
      timeZone: "UTC",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    });

    // Test OTP email
    console.log("\n📧 Sending OTP email...");
    const otpTemplate = getOTPEmailTemplate(testOTP, testEmail);

    const otpResult = await sendEmail({
      email: testEmail,
      subject: "Test - Password Reset Code (New Design)",
      html: otpTemplate,
      text: `Your password reset code is: ${testOTP}`,
    });

    console.log("✅ OTP Email sent successfully:", otpResult.messageId);

    // Wait 2 seconds before sending success email
    console.log("\n⏳ Waiting 2 seconds...");
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Test success email
    console.log("\n📧 Sending success email...");
    const successTemplate = getPasswordResetSuccessTemplate(
      testEmail,
      resetTime
    );

    const successResult = await sendEmail({
      email: testEmail,
      subject: "Test - Password Reset Successful (New Design)",
      html: successTemplate,
      text: `Your password has been successfully reset for your Coding JoJo account (${testEmail}) at ${resetTime}.`,
    });

    console.log("✅ Success Email sent successfully:", successResult.messageId);
    console.log(
      "\n🎉 Both emails sent! Check your inbox to see the new designs."
    );
  } catch (error) {
    console.error("❌ Email test failed:", error.message);
    console.error("Full error:", error);
  }
}

testBothEmails();
