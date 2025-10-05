# Instructor Verification System

A comprehensive multi-step verification system for Coding Jojo instructors, featuring email verification, SMS verification, ID document upload, selfie verification, and admin review capabilities.

## 🚀 Features

### For Instructors:
- **Email Verification**: Secure email verification with 6-digit codes
- **SMS Verification**: Phone number verification with SMS codes
- **Personal Information**: Detailed personal information collection
- **ID Document Upload**: Upload front and back of government-issued IDs
- **Selfie Verification**: Face verification with liveness detection
- **Professional Portfolio**: Optional professional information and credentials
- **Real-time Progress Tracking**: Visual progress indicators and step completion
- **Mobile-Friendly Interface**: Responsive design for all devices

### For Admins:
- **Verification Dashboard**: Comprehensive admin interface for reviewing applications
- **Bulk Operations**: Handle multiple verifications efficiently
- **Document Review**: High-resolution document viewing and verification
- **Automated Notifications**: Email notifications for status changes
- **Detailed Analytics**: Statistics and insights on verification trends
- **Approval Workflow**: Approve, reject, or request more information
- **Audit Trail**: Complete history of all verification actions

## 📋 Prerequisites

Before setting up the instructor verification system, ensure you have:

- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- Redis (optional, for caching)
- Cloudinary account (for image uploads)
- SMS service provider account (Twilio, Nexmo, InfoBip, or local provider)
- Email service provider (SMTP, SendGrid, Mailgun, etc.)

## 🛠 Installation

### Backend Setup

1. **Install Dependencies**
   ```bash
   cd coding-jojo-backend
   npm install
   
   # Install additional packages for verification system
   npm install sharp uuid @vonage/server-sdk twilio
   ```

2. **Environment Variables**
   Copy the example environment file and configure your settings:
   ```bash
   cp .env.verification.example .env
   ```
   
   Edit `.env` with your actual configuration values:
   ```env
   # SMS Service (choose one)
   SMS_PROVIDER=twilio
   TWILIO_ACCOUNT_SID=your_twilio_sid
   TWILIO_AUTH_TOKEN=your_twilio_token
   TWILIO_FROM_NUMBER=+1234567890
   
   # Cloudinary for file uploads
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   
   # Email service
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_app_password
   
   # Other required variables...
   ```

3. **Database Setup**
   The system will automatically create the required collections when you start the server. Ensure MongoDB is running:
   ```bash
   mongod --dbpath /path/to/your/db
   ```

### Frontend Setup

1. **Install Dependencies**
   ```bash
   cd coding-jojo-frontend
   npm install
   
   # Install additional packages for verification UI
   npm install framer-motion lucide-react axios
   ```

2. **Environment Variables**
   ```bash
   # .env.local
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

## 🔧 Configuration

### SMS Service Configuration

The system supports multiple SMS providers. Choose one based on your location and requirements:

#### Twilio (Global)
```env
SMS_PROVIDER=twilio
TWILIO_ACCOUNT_SID=ACxxxxx...
TWILIO_AUTH_TOKEN=your_token
TWILIO_FROM_NUMBER=+1234567890
```

#### Nexmo/Vonage (Global)
```env
SMS_PROVIDER=nexmo
NEXMO_API_KEY=your_key
NEXMO_API_SECRET=your_secret
NEXMO_FROM_NAME=CodingJojo
```

#### InfoBip (Global)
```env
SMS_PROVIDER=infobip
INFOBIP_API_KEY=your_key
INFOBIP_BASE_URL=https://api.infobip.com
INFOBIP_FROM_NUMBER=CodingJojo
```

#### Local Provider (Cameroon/Africa)
```env
SMS_PROVIDER=local
LOCAL_SMS_API_KEY=your_key
LOCAL_SMS_API_SECRET=your_secret
LOCAL_SMS_BASE_URL=https://your-provider.com/api
```

### Email Service Configuration

Choose your preferred email service:

#### SMTP (Gmail, Outlook, etc.)
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

#### SendGrid
```env
SENDGRID_API_KEY=SG.xxxxx...
```

#### Mailgun
```env
MAILGUN_API_KEY=your_key
MAILGUN_DOMAIN=your_domain
```

## 🚀 Usage

### Starting the System

1. **Backend**
   ```bash
   cd coding-jojo-backend
   npm run dev
   ```

2. **Frontend**
   ```bash
   cd coding-jojo-frontend
   npm run dev
   ```

### For Instructors

1. **Access Verification**
   Navigate to `/teacher/verification` in your application

2. **Complete Verification Steps**
   - Initialize verification with phone number
   - Verify email address
   - Verify phone number via SMS
   - Submit personal information
   - Upload ID documents (front and back)
   - Take and upload selfie
   - Submit for admin review

3. **Track Progress**
   Monitor your verification progress in real-time with visual indicators

### For Admins

1. **Access Admin Dashboard**
   Navigate to `/admin/verifications`

2. **Review Applications**
   - View all verification applications
   - Filter by status, date, or instructor
   - Search by name or email

3. **Take Actions**
   - **Approve**: Approve completed verifications
   - **Reject**: Reject with detailed feedback
   - **Request Info**: Ask for additional information

## 📊 API Endpoints

### Instructor Endpoints
```
POST   /api/teacher/verification/initialize
GET    /api/teacher/verification/status
POST   /api/teacher/verification/email/send-code
POST   /api/teacher/verification/email/verify
POST   /api/teacher/verification/phone/send-code
POST   /api/teacher/verification/phone/verify
POST   /api/teacher/verification/personal-info
POST   /api/teacher/verification/id-documents
POST   /api/teacher/verification/selfie
POST   /api/teacher/verification/professional-info
POST   /api/teacher/verification/submit
```

### Admin Endpoints
```
GET    /api/admin/verifications
GET    /api/admin/verifications/:id
PUT    /api/admin/verifications/:id/approve
PUT    /api/admin/verifications/:id/reject
PUT    /api/admin/verifications/:id/request-info
GET    /api/admin/verifications/stats
```

## 🔒 Security Features

- **Rate Limiting**: Prevents spam and abuse
- **File Validation**: Secure file upload with type and size validation
- **Code Expiration**: Verification codes expire after 10 minutes
- **Attempt Limiting**: Maximum 3 attempts per verification code
- **Data Encryption**: Sensitive data is encrypted at rest
- **Audit Logging**: Complete audit trail of all actions
- **CORS Protection**: Secure cross-origin requests
- **Input Sanitization**: All inputs are validated and sanitized

## 📱 Mobile Support

The verification interface is fully responsive and optimized for mobile devices:
- Touch-friendly interface
- Optimized file uploads
- Camera integration for selfies
- Progressive disclosure of information
- Mobile-first design approach

## 🔧 Customization

### Adding Custom Verification Steps

1. **Backend**: Update the `InstructorVerification` model
2. **Frontend**: Add new step components
3. **API**: Create corresponding endpoints
4. **Database**: Update schema if needed

### Modifying Email Templates

Email templates are in the controller files and can be customized:
- Approval emails
- Rejection emails
- Verification code emails
- Info request emails

### Customizing SMS Messages

SMS templates can be modified in the verification controller:
```javascript
const message = `Your Coding Jojo verification code is: ${verificationCode}. Expires in 10 minutes.`;
```

## 🐛 Troubleshooting

### Common Issues

1. **SMS Not Sending**
   - Check SMS provider credentials
   - Verify phone number format
   - Check provider balance/limits

2. **Email Not Sending**
   - Verify SMTP settings
   - Check spam folder
   - Ensure sender authentication

3. **File Upload Errors**
   - Check Cloudinary configuration
   - Verify file size limits
   - Ensure proper file types

4. **Database Connection Issues**
   - Verify MongoDB is running
   - Check connection string
   - Ensure proper permissions

### Debug Mode

Enable debug logging:
```env
LOG_LEVEL=debug
NODE_ENV=development
```

## 📈 Monitoring & Analytics

The system provides comprehensive analytics:
- Verification completion rates
- Average processing time
- Common rejection reasons
- Geographic distribution
- Device and browser statistics

## 🧪 Testing

### Running Tests

```bash
# Backend tests
cd coding-jojo-backend
npm test

# Frontend tests
cd coding-jojo-frontend
npm test
```

### Test Data

Use the provided test utilities to create sample verification data:
```bash
cd coding-jojo-backend
node scripts/create-test-verifications.js
```

## 🚀 Deployment

### Production Checklist

1. **Environment Variables**
   - Set `NODE_ENV=production`
   - Use production database URLs
   - Configure production SMS/email services

2. **Security**
   - Enable HTTPS
   - Set secure cookie options
   - Configure CORS properly
   - Set rate limiting

3. **Performance**
   - Enable Redis caching
   - Configure CDN for static assets
   - Optimize database indexes

4. **Monitoring**
   - Set up error tracking (Sentry)
   - Configure logging
   - Set up health checks

## 📞 Support

For support and questions:
- Email: support@codingjojo.com
- Documentation: [docs.codingjojo.com](https://docs.codingjojo.com)
- GitHub Issues: [github.com/codingjojo/verification](https://github.com/codingjojo/verification)

## 📄 License

This project is licensed under the MIT License. See LICENSE file for details.

## 🤝 Contributing

We welcome contributions! Please see CONTRIBUTING.md for guidelines.

## 🙏 Acknowledgments

- SMS providers: Twilio, Nexmo, InfoBip
- Image processing: Cloudinary, Sharp
- UI components: Framer Motion, Lucide React
- Email services: SendGrid, Mailgun

---

**Happy Teaching! 🎓**
