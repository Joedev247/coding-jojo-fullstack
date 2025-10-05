# Coding Jojo - New Features Testing Guide

## 🚀 Development Servers
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000 (or check terminal output)

## 📋 Features to Test

### 1. Course Builder (CourseBuilder.tsx)
**Location**: `/instructor/courses/new` or `/instructor/courses/edit/[id]`

#### Features to Test:
- ✅ **Course Creation**
  - Create new course with basic info
  - Add course thumbnail and media
  - Set pricing and currency (XAF support)

- ✅ **Section Management**
  - Add new sections
  - Reorder sections
  - Edit section titles
  - Delete sections

- ✅ **Lesson Creation**
  - **Video Lessons**: Upload videos with chunked upload
  - **Text Lessons**: Rich text editor with formatting
  - **Quiz Lessons**: Multiple choice, true/false questions
  - **Assignment Lessons**: File uploads and submissions

#### Test URLs:
```
http://localhost:3000/instructor/courses/new
http://localhost:3000/instructor/courses/edit/[course-id]
```

### 2. Certificate Generator (CertificateGenerator.tsx)
**Location**: `/certificates` or `/course/[id]/certificate`

#### Features to Test:
- ✅ **Certificate Creation**
  - Generate certificates for completed courses
  - QR code verification
  - Custom templates
  - PDF download functionality

#### Test URLs:
```
http://localhost:3000/certificates
http://localhost:3000/course/[course-id]/certificate
```

### 3. Instructor Dashboard (InstructorDashboard.tsx)
**Location**: `/instructor/dashboard`

#### Features to Test:
- ✅ **Analytics & Stats**
  - Course performance metrics
  - Student enrollment data
  - Revenue tracking
  - Course ratings overview

- ✅ **Course Management**
  - View all instructor courses
  - Quick edit course info
  - Publish/unpublish courses
  - Student progress tracking

#### Test URLs:
```
http://localhost:3000/instructor/dashboard
```

### 4. Live Session Manager (LiveSessionManager.tsx)
**Location**: `/instructor/live-sessions` or `/course/[id]/live`

#### Features to Test:
- ✅ **Live Session Creation**
  - Schedule live sessions
  - Set session capacity
  - Generate meeting links
  - Recording capabilities

- ✅ **Session Management**
  - Start/stop sessions
  - Manage participants
  - Screen sharing
  - Chat functionality

#### Test URLs:
```
http://localhost:3000/instructor/live-sessions
http://localhost:3000/course/[course-id]/live
```

### 5. Enhanced Services

#### Payment Service
- ✅ **Multiple Payment Methods**
  - Stripe integration
  - PayPal support
  - Mobile money (MTN, Orange)
  - Bank transfers

#### Video Service
- ✅ **Advanced Video Features**
  - Chunked video uploads
  - Video compression
  - Watermark overlay
  - DRM protection

#### Course Service
- ✅ **Enhanced Course Features**
  - Advanced course analytics
  - Student progress tracking
  - Certificate generation
  - Live session integration

## 🧪 Testing Steps

### Testing Course Builder

1. **Navigate to Course Creation**
   ```
   http://localhost:3000/instructor/courses/new
   ```

2. **Create a New Course**
   - Fill in course details
   - Add course thumbnail
   - Set pricing in XAF
   - Add course requirements and outcomes

3. **Add Sections and Lessons**
   - Click "Add Section"
   - Add different types of lessons:
     - Video lesson with upload
     - Text lesson with rich formatting
     - Quiz with multiple questions
     - Assignment with file upload

4. **Test Video Upload**
   - Select a video file
   - Monitor upload progress
   - Check video playback

5. **Save and Publish**
   - Save as draft
   - Test publish functionality

### Testing Certificate Generator

1. **Complete a Course** (or simulate completion)
2. **Generate Certificate**
   ```
   http://localhost:3000/course/[course-id]/certificate
   ```
3. **Verify Features**
   - Certificate design
   - QR code generation
   - PDF download
   - Verification system

### Testing Instructor Dashboard

1. **Access Dashboard**
   ```
   http://localhost:3000/instructor/dashboard
   ```

2. **Check Analytics**
   - View course metrics
   - Student enrollment stats
   - Revenue tracking
   - Performance indicators

3. **Manage Courses**
   - View all courses
   - Edit course details
   - Check student progress

### Testing Live Sessions

1. **Create Live Session**
   ```
   http://localhost:3000/instructor/live-sessions
   ```

2. **Schedule Session**
   - Set date and time
   - Configure capacity
   - Generate meeting link

3. **Test Session Features**
   - Start/stop session
   - Screen sharing
   - Chat functionality
   - Recording

## 🐛 Troubleshooting

### Common Issues:

1. **Server Connection Issues**
   - Check if backend is running on correct port
   - Verify CORS settings
   - Check network connectivity

2. **File Upload Issues**
   - Check file size limits
   - Verify upload directory permissions
   - Test with different file formats

3. **Authentication Issues**
   - Clear browser cookies
   - Check JWT token validity
   - Verify user permissions

4. **Database Issues**
   - Check MongoDB connection
   - Verify database schemas
   - Check for missing collections

## 📝 Test Checklist

- [ ] Backend server running
- [ ] Frontend server running
- [ ] Course creation works
- [ ] Video upload functional
- [ ] Quiz creation works
- [ ] Certificate generation works
- [ ] Instructor dashboard loads
- [ ] Live session creation works
- [ ] Payment integration works
- [ ] All TypeScript errors resolved

## 🌐 Access URLs

### Main Testing URLs:
- **Home**: http://localhost:3000
- **Course Builder**: http://localhost:3000/instructor/courses/new
- **Instructor Dashboard**: http://localhost:3000/instructor/dashboard
- **Live Sessions**: http://localhost:3000/instructor/live-sessions
- **Certificates**: http://localhost:3000/certificates

### API Endpoints to Test:
- **Courses**: http://localhost:5000/api/courses
- **Users**: http://localhost:5000/api/users
- **Payments**: http://localhost:5000/api/payments
- **Live Sessions**: http://localhost:5000/api/live-sessions
- **Certificates**: http://localhost:5000/api/certificates

## 📊 Performance Testing

### Load Testing:
1. Test with multiple concurrent users
2. Upload large video files
3. Generate multiple certificates
4. Run multiple live sessions

### Browser Testing:
- Chrome
- Firefox
- Safari
- Edge

### Mobile Testing:
- Responsive design
- Touch interactions
- Mobile-specific features

## 🔒 Security Testing

### Authentication:
- Login/logout functionality
- JWT token handling
- Permission-based access

### Data Validation:
- Input sanitization
- File upload security
- XSS prevention
- CSRF protection

---

## 🎯 Key Testing Focus Areas

1. **Course Creation Flow** - End-to-end course building
2. **Video Upload & Playback** - Chunked uploads and streaming
3. **Payment Processing** - Multiple payment methods
4. **Certificate Generation** - PDF and QR verification
5. **Live Session Management** - Real-time features
6. **Instructor Analytics** - Data accuracy and visualization

Happy Testing! 🚀
