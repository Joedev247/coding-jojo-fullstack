const nodemailer = require('nodemailer');
const Bull = require('bull');
const Redis = require('redis');
const handlebars = require('handlebars');
const path = require('path');
const fs = require('fs').promises;

class EmailService {
  constructor() {
    this.transporter = null;
    this.emailQueue = null;
    this.templates = new Map();
    this.initializeService();
  }

  async initializeService() {
    await this.setupTransporter();
    await this.setupQueue();
    await this.loadTemplates();
  }

  async setupTransporter() {
    // Check if email is disabled
    if (process.env.EMAIL_ENABLED === 'false') {
      console.log('Email service disabled');
      return;
    }

    const emailConfig = {
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_PORT) || 587,
      secure: process.env.EMAIL_PORT === '465', // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    };

    // Skip if no credentials provided
    if (!emailConfig.auth.user || !emailConfig.auth.pass) {
      console.log('Email credentials not provided, email service disabled');
      return;
    }

    // Support for different email providers
    if (process.env.EMAIL_PROVIDER === 'sendgrid') {
      emailConfig.host = 'smtp.sendgrid.net';
      emailConfig.port = 587;
      emailConfig.auth.user = 'apikey';
      emailConfig.auth.pass = process.env.SENDGRID_API_KEY;
    } else if (process.env.EMAIL_PROVIDER === 'mailgun') {
      emailConfig.host = 'smtp.mailgun.org';
      emailConfig.port = 587;
      emailConfig.auth.user = process.env.MAILGUN_SMTP_LOGIN;
      emailConfig.auth.pass = process.env.MAILGUN_SMTP_PASSWORD;
    }

    this.transporter = nodemailer.createTransport(emailConfig);

    // Verify connection
    try {
      await this.transporter.verify();
      console.log('Email service connected successfully');
    } catch (error) {
      console.error('Email service connection failed:', error.message);
      this.transporter = null;
    }
  }

  async setupQueue() {
    // Skip queue setup if Redis is disabled or email is disabled
    if (process.env.REDIS_ENABLED === 'false' || process.env.EMAIL_ENABLED === 'false') {
      console.log('Email queue disabled (Redis or Email disabled)');
      return;
    }

    try {
      const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
      this.emailQueue = new Bull('email processing', redisUrl, {
        defaultJobOptions: {
          removeOnComplete: 10,
          removeOnFail: 5,
          attempts: 3,
          backoff: {
            type: 'exponential',
            delay: 5000,
          },
        },
      });

      // Process email jobs
      this.emailQueue.process(async (job) => {
        return await this.processEmailJob(job.data);
      });

      console.log('Email queue initialized');
    } catch (error) {
      console.error('Email queue setup failed:', error.message);
      this.emailQueue = null;
    }
  }

  async loadTemplates() {
    try {
      const templatesDir = path.join(__dirname, '../templates/email');
      
      // Default templates
      const defaultTemplates = {
        welcome: {
          subject: 'Welcome to Coding JoJo!',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #2563eb;">Welcome to Coding JoJo, {{name}}! 🎉</h2>
              <p>We're excited to have you join our learning community!</p>
              <p>Start your coding journey today with our comprehensive courses.</p>
              <a href="{{loginUrl}}" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Get Started</a>
            </div>
          `
        },
        resetPassword: {
          subject: 'Reset Your Password',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #dc2626;">Password Reset Request</h2>
              <p>Hi {{name}},</p>
              <p>You requested a password reset. Click the button below to reset your password:</p>
              <a href="{{resetUrl}}" style="background: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Reset Password</a>
              <p><small>This link expires in 1 hour. If you didn't request this, please ignore this email.</small></p>
            </div>
          `
        },
        courseEnrollment: {
          subject: 'Course Enrollment Confirmation',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #059669;">Enrollment Confirmed! 🎯</h2>
              <p>Hi {{studentName}},</p>
              <p>You've successfully enrolled in <strong>{{courseName}}</strong>!</p>
              <div style="background: #f3f4f6; padding: 16px; border-radius: 8px; margin: 16px 0;">
                <h3>Course Details:</h3>
                <p><strong>Instructor:</strong> {{instructorName}}</p>
                <p><strong>Duration:</strong> {{duration}}</p>
                <p><strong>Level:</strong> {{level}}</p>
              </div>
              <a href="{{courseUrl}}" style="background: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Start Learning</a>
            </div>
          `
        },
        courseCompletion: {
          subject: 'Congratulations! Course Completed 🏆',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #7c3aed;">Congratulations! 🏆</h2>
              <p>Hi {{studentName}},</p>
              <p>You've successfully completed <strong>{{courseName}}</strong>!</p>
              <div style="background: #fef3c7; padding: 16px; border-radius: 8px; margin: 16px 0;">
                <p>🎯 Final Score: {{score}}%</p>
                <p>⏱️ Completion Time: {{completionTime}}</p>
                <p>📅 Completed On: {{completionDate}}</p>
              </div>
              <a href="{{certificateUrl}}" style="background: #7c3aed; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Download Certificate</a>
            </div>
          `
        },
        paymentConfirmation: {
          subject: 'Payment Confirmation',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #059669;">Payment Confirmed! ✅</h2>
              <p>Hi {{customerName}},</p>
              <p>Your payment has been successfully processed.</p>
              <div style="background: #f0fdf4; padding: 16px; border-radius: 8px; margin: 16px 0;">
                <h3>Payment Details:</h3>
                <p><strong>Amount:</strong> {{amount}} {{currency}}</p>
                <p><strong>Transaction ID:</strong> {{transactionId}}</p>
                <p><strong>Date:</strong> {{paymentDate}}</p>
                <p><strong>Method:</strong> {{paymentMethod}}</p>
              </div>
              <a href="{{invoiceUrl}}" style="background: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">View Invoice</a>
            </div>
          `
        },
        newMessage: {
          subject: 'New Message Received',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #2563eb;">New Message 💬</h2>
              <p>Hi {{recipientName}},</p>
              <p>You have a new message from <strong>{{senderName}}</strong>:</p>
              <div style="background: #f8fafc; padding: 16px; border-left: 4px solid #2563eb; margin: 16px 0;">
                <p>"{{messagePreview}}"</p>
              </div>
              <a href="{{messageUrl}}" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Read Full Message</a>
            </div>
          `
        },
        courseReminder: {
          subject: 'Continue Your Learning Journey',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #f59e0b;">Don't Stop Now! 📚</h2>
              <p>Hi {{studentName}},</p>
              <p>You're making great progress in <strong>{{courseName}}</strong>!</p>
              <div style="background: #fffbeb; padding: 16px; border-radius: 8px; margin: 16px 0;">
                <p>📈 Progress: {{progressPercentage}}% complete</p>
                <p>📝 Next Lesson: {{nextLesson}}</p>
                <p>⏰ Estimated time to completion: {{timeRemaining}}</p>
              </div>
              <a href="{{continueUrl}}" style="background: #f59e0b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Continue Learning</a>
            </div>
          `
        }
      };

      // Load custom templates if they exist
      try {
        const files = await fs.readdir(templatesDir);
        for (const file of files) {
          if (file.endsWith('.hbs') || file.endsWith('.html')) {
            const templateName = path.basename(file, path.extname(file));
            const templateContent = await fs.readFile(path.join(templatesDir, file), 'utf8');
            this.templates.set(templateName, {
              html: templateContent,
              subject: `{{subject}}` // Default subject, can be overridden
            });
          }
        }
      } catch (error) {
        // Templates directory doesn't exist, use defaults
      }

      // Set default templates
      Object.entries(defaultTemplates).forEach(([name, template]) => {
        if (!this.templates.has(name)) {
          this.templates.set(name, template);
        }
      });

      console.log(`Loaded ${this.templates.size} email templates`);
    } catch (error) {
      console.error('Failed to load email templates:', error);
    }
  }

  async sendEmail(options, priority = 'normal') {
    if (!this.emailQueue) {
      // Fallback to direct sending if queue is not available
      return await this.sendDirectEmail(options);
    }

    // Add to queue for processing
    const jobOptions = {
      priority: this.getPriority(priority),
      delay: options.delay || 0,
    };

    const job = await this.emailQueue.add('sendEmail', options, jobOptions);
    
    return {
      success: true,
      jobId: job.id,
      message: 'Email queued successfully'
    };
  }

  async processEmailJob(data) {
    try {
      const result = await this.sendDirectEmail(data);
      return result;
    } catch (error) {
      console.error('Email job processing failed:', error);
      throw error;
    }
  }

  async sendDirectEmail(options) {
    try {
      const {
        to,
        cc,
        bcc,
        subject,
        text,
        html,
        template,
        templateData = {},
        attachments = [],
        replyTo,
        from = process.env.FROM_EMAIL || 'noreply@codingjojo.com'
      } = options;

      let emailHtml = html;
      let emailSubject = subject;

      // Use template if specified
      if (template && this.templates.has(template)) {
        const templateConfig = this.templates.get(template);
        const compiledTemplate = handlebars.compile(templateConfig.html);
        emailHtml = compiledTemplate(templateData);
        
        if (!subject && templateConfig.subject) {
          const compiledSubject = handlebars.compile(templateConfig.subject);
          emailSubject = compiledSubject(templateData);
        }
      }

      const mailOptions = {
        from: from,
        to: Array.isArray(to) ? to.join(', ') : to,
        cc: cc ? (Array.isArray(cc) ? cc.join(', ') : cc) : undefined,
        bcc: bcc ? (Array.isArray(bcc) ? bcc.join(', ') : bcc) : undefined,
        subject: emailSubject,
        text: text,
        html: emailHtml,
        replyTo: replyTo,
        attachments: attachments
      };

      const result = await this.transporter.sendMail(mailOptions);

      return {
        success: true,
        messageId: result.messageId,
        response: result.response
      };
    } catch (error) {
      console.error('Direct email sending failed:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Batch email sending
  async sendBulkEmails(emailList, template, baseTemplateData = {}) {
    const jobs = emailList.map(emailData => ({
      to: emailData.email,
      template: template,
      templateData: { ...baseTemplateData, ...emailData }
    }));

    if (this.emailQueue) {
      const batchJobs = await this.emailQueue.addBulk(
        jobs.map(job => ({
          name: 'sendEmail',
          data: job,
          opts: { priority: this.getPriority('low') }
        }))
      );

      return {
        success: true,
        jobIds: batchJobs.map(job => job.id),
        count: jobs.length
      };
    } else {
      // Fallback to direct sending with rate limiting
      const results = [];
      for (let i = 0; i < jobs.length; i++) {
        const result = await this.sendDirectEmail(jobs[i]);
        results.push(result);
        
        // Rate limiting: wait 1 second between emails
        if (i < jobs.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }

      return {
        success: true,
        results: results,
        count: jobs.length
      };
    }
  }

  // Send welcome email
  async sendWelcomeEmail(userData) {
    return await this.sendEmail({
      to: userData.email,
      template: 'welcome',
      templateData: {
        name: userData.name,
        loginUrl: `${process.env.FRONTEND_URL}/login`
      }
    }, 'high');
  }

  // Send password reset email
  async sendPasswordResetEmail(userData, resetToken) {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    
    return await this.sendEmail({
      to: userData.email,
      template: 'resetPassword',
      templateData: {
        name: userData.name,
        resetUrl: resetUrl
      }
    }, 'high');
  }

  // Send course enrollment confirmation
  async sendCourseEnrollmentEmail(enrollmentData) {
    return await this.sendEmail({
      to: enrollmentData.studentEmail,
      template: 'courseEnrollment',
      templateData: {
        studentName: enrollmentData.studentName,
        courseName: enrollmentData.courseName,
        instructorName: enrollmentData.instructorName,
        duration: enrollmentData.duration,
        level: enrollmentData.level,
        courseUrl: `${process.env.FRONTEND_URL}/courses/${enrollmentData.courseId}`
      }
    });
  }

  // Send course completion certificate
  async sendCourseCompletionEmail(completionData) {
    return await this.sendEmail({
      to: completionData.studentEmail,
      template: 'courseCompletion',
      templateData: {
        studentName: completionData.studentName,
        courseName: completionData.courseName,
        score: completionData.score,
        completionTime: completionData.completionTime,
        completionDate: new Date().toLocaleDateString(),
        certificateUrl: completionData.certificateUrl
      }
    }, 'high');
  }

  // Send payment confirmation
  async sendPaymentConfirmationEmail(paymentData) {
    return await this.sendEmail({
      to: paymentData.customerEmail,
      template: 'paymentConfirmation',
      templateData: {
        customerName: paymentData.customerName,
        amount: paymentData.amount,
        currency: paymentData.currency,
        transactionId: paymentData.transactionId,
        paymentDate: new Date().toLocaleDateString(),
        paymentMethod: paymentData.paymentMethod,
        invoiceUrl: paymentData.invoiceUrl
      }
    });
  }

  // Send notification email
  async sendNotificationEmail(notificationData) {
    return await this.sendEmail({
      to: notificationData.recipientEmail,
      template: 'newMessage',
      templateData: {
        recipientName: notificationData.recipientName,
        senderName: notificationData.senderName,
        messagePreview: notificationData.message.substring(0, 100) + '...',
        messageUrl: `${process.env.FRONTEND_URL}/messages/${notificationData.messageId}`
      }
    });
  }

  // Send course reminder
  async sendCourseReminderEmail(reminderData) {
    return await this.sendEmail({
      to: reminderData.studentEmail,
      template: 'courseReminder',
      templateData: {
        studentName: reminderData.studentName,
        courseName: reminderData.courseName,
        progressPercentage: reminderData.progressPercentage,
        nextLesson: reminderData.nextLesson,
        timeRemaining: reminderData.timeRemaining,
        continueUrl: `${process.env.FRONTEND_URL}/courses/${reminderData.courseId}/continue`
      }
    });
  }

  // Get queue statistics
  async getQueueStats() {
    if (!this.emailQueue) {
      return { error: 'Email queue not initialized' };
    }

    const waiting = await this.emailQueue.getWaiting();
    const active = await this.emailQueue.getActive();
    const completed = await this.emailQueue.getCompleted();
    const failed = await this.emailQueue.getFailed();

    return {
      waiting: waiting.length,
      active: active.length,
      completed: completed.length,
      failed: failed.length
    };
  }

  // Retry failed jobs
  async retryFailedJobs() {
    if (!this.emailQueue) {
      return { error: 'Email queue not initialized' };
    }

    const failedJobs = await this.emailQueue.getFailed();
    let retriedCount = 0;

    for (const job of failedJobs) {
      try {
        await job.retry();
        retriedCount++;
      } catch (error) {
        console.error(`Failed to retry job ${job.id}:`, error);
      }
    }

    return { retriedCount, totalFailed: failedJobs.length };
  }

  getPriority(priority) {
    const priorities = {
      low: 1,
      normal: 5,
      high: 10,
      critical: 15
    };
    return priorities[priority] || priorities.normal;
  }

  // Cleanup old jobs
  async cleanupJobs() {
    if (!this.emailQueue) {
      return { error: 'Email queue not initialized' };
    }

    await this.emailQueue.clean(24 * 60 * 60 * 1000, 'completed'); // Remove completed jobs older than 24 hours
    await this.emailQueue.clean(7 * 24 * 60 * 60 * 1000, 'failed'); // Remove failed jobs older than 7 days

    return { success: true };
  }
}

module.exports = new EmailService();
