# Environment Variables Configuration Guide

This file contains example environment variables for the RankBridge LMS application.
Copy these files and update with your actual values.

## Backend Server (.env)
Create this file in `Lms-Mobile-App/server/.env`

```env
# Database Configuration
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/lms
REDIS_URL=redis://localhost:6379

# JWT Secrets (Generate strong random strings)
ACCESS_TOKEN=your_super_secret_access_token_here_minimum_64_characters_long
REFRESH_TOKEN=your_super_secret_refresh_token_here_minimum_64_characters_long
ACTIVATION_SECRET=your_activation_secret_here_32_characters_minimum

# Email Configuration (Gmail SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SERVICE=gmail
SMTP_MAIL=your-email@gmail.com
SMTP_PASSWORD=your-gmail-app-password

# Cloudinary Configuration
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_SECRET_KEY=your_cloudinary_secret_key

# Stripe Payment Configuration
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here

# CORS Origins
ORIGIN=http://localhost:3000,http://localhost:3003,http://localhost:8082

# Server Configuration
PORT=8000
NODE_ENV=development
```

## Admin Panel (.env.local)
Create this file in `Lms-Mobile-App/admin/.env.local`

```env
# API Configuration
NEXT_PUBLIC_SERVER_URI=http://localhost:8000/api/v1

# OAuth Configuration
GOOGLE_CLIENT_ID=your_google_oauth_client_id_here
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret_here
GITHUB_CLIENT_ID=your_github_oauth_client_id_here
GITHUB_CLIENT_SECRET=your_github_oauth_client_secret_here

# NextAuth Configuration
SECRET=your_nextauth_secret_here_minimum_32_characters
NEXTAUTH_URL=http://localhost:3003
```

## Mobile Client Configuration
Update the file `Lms-Mobile-App/client/utils/uri.ts`

```typescript
// For development
export const SERVER_URI = "http://localhost:8000/api/v1";

// For production (replace with your deployed backend URL)
// export const SERVER_URI = "https://your-backend-domain.com/api/v1";
```

## Setup Instructions

### 1. MongoDB Atlas
1. Create account at https://www.mongodb.com/atlas
2. Create a new cluster
3. Get connection string and replace in DATABASE_URL

### 2. Redis Setup
**Local Redis:**
```bash
# macOS
brew install redis
brew services start redis

# Ubuntu
sudo apt install redis-server
sudo systemctl start redis-server
```

**Cloud Redis (Redis Cloud):**
1. Sign up at https://redis.com/redis-enterprise-cloud/
2. Create free database
3. Get connection URL

### 3. Gmail SMTP Setup
1. Enable 2-factor authentication on Gmail
2. Generate App Password:
   - Google Account → Security → App passwords
   - Generate password for "Mail"
   - Use this password in SMTP_PASSWORD (not your regular password)

### 4. Cloudinary Setup
1. Create account at https://cloudinary.com/
2. Get cloud name, API key, and secret from dashboard
3. Used for image/video uploads

### 5. Stripe Setup
1. Create account at https://stripe.com/
2. Get test keys from dashboard
3. For production, use live keys

### 6. OAuth Setup (Admin Panel)
**Google OAuth:**
1. Go to Google Cloud Console
2. Create project and enable Google+ API
3. Create OAuth 2.0 credentials
4. Add authorized redirect URI: http://localhost:3003/api/auth/callback/google

**GitHub OAuth:**
1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Create new OAuth App
3. Authorization callback URL: http://localhost:3003/api/auth/callback/github

## Security Notes

⚠️ **Important Security Guidelines:**

1. **Never commit .env files to version control**
2. **Generate strong, unique secrets for production**
3. **Use different credentials for development and production**
4. **Regularly rotate API keys and passwords**
5. **Use environment-specific configurations**

## JWT Token Generation
You can generate secure tokens using Node.js:

```javascript
const crypto = require('crypto');

// Generate ACCESS_TOKEN
console.log('ACCESS_TOKEN:', crypto.randomBytes(32).toString('hex'));

// Generate REFRESH_TOKEN  
console.log('REFRESH_TOKEN:', crypto.randomBytes(32).toString('hex'));

// Generate ACTIVATION_SECRET
console.log('ACTIVATION_SECRET:', crypto.randomBytes(16).toString('hex'));
```

## Testing Configuration

To test if your configuration is working:

1. **Backend Test:**
   ```bash
   cd Lms-Mobile-App/server
   npm run dev
   # Should show "Server connected" and "Database connected"
   ```

2. **Database Test:**
   ```bash
   curl http://localhost:8000/api/v1/get-courses
   # Should return JSON response
   ```

3. **Email Test:**
   - Try user registration
   - Check if activation email is sent

## Troubleshooting

**Common Issues:**

1. **MongoDB Connection Failed:**
   - Check if IP is whitelisted in MongoDB Atlas
   - Verify connection string format
   - Ensure network access is configured

2. **Redis Connection Failed:**
   - Make sure Redis is running locally
   - Check Redis URL format for cloud Redis

3. **Email Not Sending:**
   - Verify Gmail app password (not regular password)
   - Check if 2FA is enabled on Gmail
   - Ensure SMTP settings are correct

4. **Cloudinary Upload Failed:**
   - Verify API credentials
   - Check if upload presets are configured

For more help, check the main README.md or create an issue on GitHub.