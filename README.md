# RankBridge - Full-Stack Learning Management System (LMS)

<div align="center">
  <img src="https://img.shields.io/badge/React%20Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Native" />
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/redis-CC0000?style=for-the-badge&logo=redis&logoColor=white" alt="Redis" />
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" alt="Express.js" />
</div>

## 📱 About RankBridge

RankBridge is a comprehensive, full-stack Learning Management System designed for modern mobile and web learning experiences. Built with cutting-edge technologies, it provides seamless course management, user authentication, real-time interactions, and a professional admin dashboard.

### 🌟 Key Features

- **🎓 Complete Course Management** - Create, edit, and manage courses with video content
- **📱 Cross-Platform Mobile App** - React Native Expo app for iOS and Android
- **🖥️ Professional Admin Dashboard** - Next.js admin panel with modern UI
- **👤 Advanced User Profiles** - Comprehensive profile management with mobile numbers
- **🔐 Secure Authentication** - JWT-based auth with Redis session management
- **💳 Payment Integration** - Stripe payment processing for course purchases  
- **📧 Email System** - Automated email notifications and user verification
- **☁️ Cloud Storage** - Cloudinary integration for media management
- **📊 Real-time Analytics** - User engagement and course performance tracking
- **🔍 Advanced Search** - Smart course discovery and filtering

## 🏗️ Architecture

### Backend (Node.js/Express)
- **Port**: 8000
- **Database**: MongoDB Atlas with Mongoose ODM
- **Cache**: Redis for session management and caching
- **Authentication**: JWT tokens with refresh token rotation
- **File Upload**: Cloudinary for images and videos
- **Email**: Gmail SMTP with Nodemailer
- **Real-time**: Socket.IO for live features

### Mobile Client (React Native)
- **Port**: 8082
- **Framework**: Expo with React Native
- **Navigation**: Expo Router with file-based routing
- **State Management**: Context API with custom hooks
- **UI Components**: Custom components with responsive design
- **Fonts**: Google Fonts (Raleway, Nunito)

### Admin Panel (Next.js)
- **Port**: 3003
- **Framework**: Next.js 13+ with App Router
- **UI**: Tailwind CSS with glassmorphism design
- **Components**: Material-UI integration
- **State**: Redux Toolkit with RTK Query
- **Charts**: Recharts for analytics visualization

## 🚀 Quick Start

### Prerequisites
- Node.js 18.x or higher
- MongoDB Atlas account
- Redis server
- Expo CLI
- Git

### 1. Clone Repository
```bash
git clone https://github.com/SanketsMane/LMS-ANDROID-APP.git
cd LMS-ANDROID-APP
```

### 2. Backend Setup
```bash
cd Lms-Mobile-App/server

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Configure environment variables (see Environment Variables section)
nano .env

# Start development server
npm run dev
```

### 3. Mobile Client Setup
```bash
cd ../client

# Install dependencies
npm install

# Start Expo development server
npx expo start
```

### 4. Admin Panel Setup
```bash
cd ../admin

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Start Next.js development server
npm run dev
```

## ⚙️ Environment Variables

### Backend (.env)
```env
# Database
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/lms
REDIS_URL=redis://localhost:6379

# JWT Secrets
ACCESS_TOKEN=your_super_secret_access_token_here_64_chars_minimum
REFRESH_TOKEN=your_super_secret_refresh_token_here_64_chars_minimum
ACTIVATION_SECRET=your_activation_secret_here

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SERVICE=gmail
SMTP_MAIL=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# Cloudinary
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_SECRET_KEY=your_cloudinary_secret_key

# Stripe
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key

# Origins
ORIGIN=http://localhost:3000,http://localhost:3003,http://localhost:8082
```

### Admin Panel (.env.local)
```env
NEXT_PUBLIC_SERVER_URI=http://localhost:8000/api/v1
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
GITHUB_CLIENT_ID=your_github_oauth_client_id
GITHUB_CLIENT_SECRET=your_github_oauth_client_secret
SECRET=your_nextauth_secret
```

### Mobile Client
Update `utils/uri.ts`:
```typescript
export const SERVER_URI = "http://localhost:8000/api/v1";
```

## 📂 Project Structure

```
LMS-ANDROID-APP/
├── Lms-Mobile-App/
│   ├── server/                 # Backend API (Node.js/Express)
│   │   ├── controllers/        # Route controllers
│   │   ├── models/            # Database models
│   │   ├── routes/            # API routes
│   │   ├── middleware/        # Custom middleware
│   │   ├── services/          # Business logic
│   │   ├── utils/             # Utility functions
│   │   └── scripts/           # Start scripts
│   │
│   ├── client/                # Mobile App (React Native)
│   │   ├── app/               # Expo Router pages
│   │   ├── components/        # Reusable components
│   │   ├── screens/           # Screen components
│   │   ├── hooks/             # Custom hooks
│   │   ├── types/             # TypeScript definitions
│   │   └── utils/             # Client utilities
│   │
│   └── admin/                 # Admin Dashboard (Next.js)
│       ├── app/               # Next.js 13 app directory
│       ├── components/        # React components
│       ├── redux/             # Redux store & slices
│       ├── pages/             # Additional pages
│       └── utils/             # Admin utilities
│
├── README.md
└── Documentation/
```

## 🔧 API Endpoints

### Authentication
- `POST /api/v1/registration` - User registration
- `POST /api/v1/activate-user` - Account activation
- `POST /api/v1/login` - User login
- `GET /api/v1/logout` - User logout
- `GET /api/v1/me` - Get current user
- `POST /api/v1/social-auth` - Social authentication

### User Management
- `PUT /api/v1/update-user-info` - Update profile (name, email, mobile)
- `PUT /api/v1/update-user-password` - Change password
- `PUT /api/v1/update-user-avatar` - Update profile picture
- `GET /api/v1/get-users` - Get all users (admin)

### Course Management
- `GET /api/v1/get-courses` - Get all courses
- `GET /api/v1/get-course/:id` - Get single course
- `POST /api/v1/create-course` - Create course (admin)
- `PUT /api/v1/edit-course/:id` - Edit course (admin)
- `DELETE /api/v1/delete-course/:id` - Delete course (admin)

### Payments & Orders
- `POST /api/v1/create-order` - Create course order
- `GET /api/v1/get-orders` - Get user orders
- `GET /api/v1/get-all-orders` - Get all orders (admin)

## 📱 Mobile App Features

### User Features
- **🔐 Complete Authentication Flow**
  - User registration with email verification
  - Secure login/logout
  - Social authentication (Google, GitHub)
  - Password reset functionality

- **👤 Comprehensive Profile Management**
  - Edit personal information (name, email, mobile)
  - Change password with validation
  - Upload and manage profile pictures
  - View enrollment history

- **📚 Course Experience**
  - Browse course catalog with search and filters
  - View detailed course information
  - Watch video lessons with progress tracking
  - Access enrolled courses
  - Course reviews and ratings

- **💳 Seamless Payments**
  - Secure Stripe integration
  - Course purchase workflow
  - Order history and receipts

### Admin Features
- **📊 Modern Dashboard**
  - User analytics and engagement metrics
  - Course performance tracking
  - Revenue and sales analytics
  - Real-time notifications

- **👥 User Management**
  - View and manage all users
  - User role assignment
  - Account status management
  - Bulk operations

- **🎓 Course Administration**
  - Create and edit courses
  - Upload video content via Cloudinary
  - Manage course materials
  - Set pricing and availability

## 🎨 Design System

### Color Palette
- **Primary**: #2467EC (Blue)
- **Secondary**: #E5ECF9 (Light Blue)
- **Accent**: #DC3545 (Red)
- **Success**: #28A745 (Green)
- **Background**: Linear gradients with glassmorphism

### Typography
- **Headers**: Raleway (600, 700)
- **Body**: Nunito (400, 500, 600, 700)
- **UI Elements**: System fonts

### Components
- **Modern Cards**: Rounded corners with subtle shadows
- **Glassmorphism**: Backdrop blur effects
- **Responsive Design**: Adapts to all screen sizes
- **Professional Icons**: Expo Vector Icons

## 🔒 Security Features

- **JWT Authentication** with access/refresh token rotation
- **Password Hashing** using bcrypt
- **Input Validation** and sanitization
- **Rate Limiting** on API endpoints
- **CORS Configuration** for cross-origin requests
- **Environment Variables** for sensitive data
- **Secure Email** with Gmail SMTP and app passwords

## 🧪 Testing & Development

### Start Development Environment
```bash
# Terminal 1: Backend
cd Lms-Mobile-App/server && npm run dev

# Terminal 2: Mobile Client
cd Lms-Mobile-App/client && npx expo start

# Terminal 3: Admin Panel
cd Lms-Mobile-App/admin && npm run dev
```

### Testing URLs
- **Backend API**: http://localhost:8000/api/v1
- **Mobile Client**: http://localhost:8082
- **Admin Panel**: http://localhost:3003

## 🚀 Deployment

### Backend (Node.js)
- **Recommended**: Railway, Render, or Heroku
- **Requirements**: Node.js 18.x, MongoDB Atlas, Redis Cloud
- **Build Command**: `npm run build`
- **Start Command**: `npm start`

### Mobile App
- **Android**: Build APK with `expo build:android`
- **iOS**: Build IPA with `expo build:ios`
- **Web**: Deploy with `expo export:web`

### Admin Panel
- **Recommended**: Vercel or Netlify
- **Build Command**: `npm run build`
- **Framework**: Next.js

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Sanket Mane**
- GitHub: [@SanketsMane](https://github.com/SanketsMane)
- Email: sanket@example.com

## 🙏 Acknowledgments

- **Expo Team** for the amazing React Native framework
- **Next.js Team** for the powerful React framework
- **MongoDB** for the flexible database solution
- **Stripe** for secure payment processing
- **Cloudinary** for media management
- **All Contributors** who helped improve this project

## 📞 Support

If you have any questions or need support, please:
1. Check the [Issues](https://github.com/SanketsMane/LMS-ANDROID-APP/issues) page
2. Create a new issue with detailed description
3. Join our community discussions

---

<div align="center">
  <p>Made with ❤️ by Sanket Mane</p>
  <p>⭐ Star this repository if you found it helpful!</p>
</div>