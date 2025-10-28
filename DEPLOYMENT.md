# 🚀 Deployment Guide - RankBridge LMS

This guide covers deploying the RankBridge LMS to production environments.

## 📋 Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] Database connections tested
- [ ] Email system working
- [ ] Payment gateway configured
- [ ] File uploads tested
- [ ] All secrets secured
- [ ] Production domains configured

## 🌐 Backend Deployment (Node.js/Express)

### Recommended Platforms

1. **Railway** (Recommended)
2. **Render**
3. **Heroku**
4. **DigitalOcean App Platform**
5. **AWS Elastic Beanstalk**

### Railway Deployment

1. **Connect Repository:**
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli
   
   # Login and connect
   railway login
   railway link
   ```

2. **Configure Environment:**
   ```bash
   # Set production environment variables
   railway variables set DATABASE_URL="your-mongodb-atlas-url"
   railway variables set REDIS_URL="your-redis-cloud-url"
   railway variables set ACCESS_TOKEN="your-production-access-token"
   # ... add all other environment variables
   ```

3. **Deploy:**
   ```bash
   railway up
   ```

### Environment Variables for Production
```env
# Database
DATABASE_URL=mongodb+srv://user:pass@cluster.mongodb.net/lms_prod
REDIS_URL=rediss://user:pass@host:port

# JWT (Generate new tokens for production)
ACCESS_TOKEN=production_access_token_64_chars_minimum
REFRESH_TOKEN=production_refresh_token_64_chars_minimum

# Email
SMTP_MAIL=noreply@yourdomain.com
SMTP_PASSWORD=your_production_app_password

# Cloudinary
CLOUD_NAME=your_production_cloud_name
CLOUD_API_KEY=your_production_api_key
CLOUD_SECRET_KEY=your_production_secret_key

# Stripe (Live keys)
STRIPE_PUBLISHABLE_KEY=pk_live_your_publishable_key
STRIPE_SECRET_KEY=sk_live_your_secret_key

# Production Origins
ORIGIN=https://yourdomain.com,https://admin.yourdomain.com,https://app.yourdomain.com

# Server Config
NODE_ENV=production
PORT=8000
```

## 📱 Mobile App Deployment

### Android APK Build

1. **Configure App Signing:**
   ```bash
   cd Lms-Mobile-App/client
   
   # Generate keystore
   keytool -genkeypair -v -keystore rankbridge-release-key.keystore -alias rankbridge -keyalg RSA -keysize 2048 -validity 10000
   ```

2. **Update app.json:**
   ```json
   {
     "expo": {
       "name": "RankBridge",
       "slug": "rankbridge-lms",
       "version": "1.0.0",
       "android": {
         "package": "com.sanketsmane.rankbridge",
         "versionCode": 1
       },
       "ios": {
         "bundleIdentifier": "com.sanketsmane.rankbridge"
       }
     }
   }
   ```

3. **Build APK:**
   ```bash
   # Install EAS CLI
   npm install -g @expo/eas-cli
   
   # Configure build
   eas build:configure
   
   # Build for Android
   eas build --platform android --profile production
   ```

### iOS App Store Build

1. **Requirements:**
   - Apple Developer Account ($99/year)
   - Mac with Xcode

2. **Build for iOS:**
   ```bash
   # Build for iOS
   eas build --platform ios --profile production
   ```

3. **Submit to App Store:**
   ```bash
   eas submit --platform ios
   ```

### Expo Go Distribution (Development)
```bash
# Publish to Expo Go
expo publish
```

## 🖥️ Admin Panel Deployment

### Vercel Deployment (Recommended)

1. **Connect Repository:**
   - Go to [vercel.com](https://vercel.com)
   - Import GitHub repository
   - Select `Lms-Mobile-App/admin` as root directory

2. **Configure Environment Variables:**
   ```env
   NEXT_PUBLIC_SERVER_URI=https://your-backend-url.com/api/v1
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   SECRET=your_nextauth_secret_production
   NEXTAUTH_URL=https://admin.yourdomain.com
   ```

3. **Deploy:**
   - Vercel will automatically deploy on push to main branch

### Netlify Deployment

1. **Build Settings:**
   ```bash
   # Build command
   npm run build
   
   # Publish directory
   out
   ```

2. **Configure _redirects:**
   ```
   # Add to public/_redirects
   /*    /index.html   200
   ```

## 🗄️ Database & Cache Setup

### MongoDB Atlas (Production)

1. **Create Production Cluster:**
   - Use M2/M5 cluster for production
   - Enable backup
   - Configure IP whitelist for production servers

2. **Security Configuration:**
   ```javascript
   // Enable authentication
   // Create dedicated user for production
   // Use connection string with SSL
   ```

### Redis Cloud

1. **Production Redis:**
   - Sign up for Redis Cloud
   - Create production database
   - Use TLS connection string

## 📧 Email Configuration (Production)

### Gmail SMTP (Development)
- Use Gmail app passwords for development only

### SendGrid (Production Recommended)
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SERVICE=sendgrid
SMTP_MAIL=noreply@yourdomain.com
SMTP_PASSWORD=your_sendgrid_api_key
```

### AWS SES (Enterprise)
```env
SMTP_HOST=email-smtp.us-east-1.amazonaws.com
SMTP_PORT=587
SMTP_SERVICE=ses
SMTP_MAIL=noreply@yourdomain.com
SMTP_PASSWORD=your_ses_smtp_password
```

## 🔒 Security Checklist

### SSL/TLS Configuration
- [ ] Enable HTTPS on all domains
- [ ] Configure SSL certificates
- [ ] Redirect HTTP to HTTPS
- [ ] Use secure headers

### Environment Security
- [ ] Generate new JWT secrets for production
- [ ] Use strong database passwords
- [ ] Enable database authentication
- [ ] Rotate API keys regularly
- [ ] Use different keys for each environment

### CORS Configuration
```javascript
// Update CORS origins for production
const allowedOrigins = [
  'https://yourdomain.com',
  'https://admin.yourdomain.com',
  'https://app.yourdomain.com'
];
```

## 🔄 CI/CD Pipeline

### GitHub Actions Example
```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Railway
        run: |
          npm install -g @railway/cli
          railway login --token ${{ secrets.RAILWAY_TOKEN }}
          railway up
  
  deploy-admin:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

## 📊 Monitoring & Analytics

### Application Monitoring
- **Sentry**: Error tracking and performance monitoring
- **LogRocket**: Session replay and logging
- **New Relic**: Application performance monitoring

### Database Monitoring
- **MongoDB Atlas**: Built-in monitoring
- **Redis Cloud**: Performance metrics

### Uptime Monitoring
- **Pingdom**: Uptime monitoring
- **UptimeRobot**: Free uptime monitoring

## 🎯 Performance Optimization

### Backend Optimization
```javascript
// Enable compression
app.use(compression());

// Cache static assets
app.use(express.static('public', { maxAge: 31557600000 }));

// Database indexing
// Create indexes on frequently queried fields
```

### CDN Configuration
- Use Cloudinary CDN for images/videos
- Configure CloudFlare for additional caching

### Mobile App Optimization
```javascript
// Enable Hermes engine
// Configure app bundle splitting
// Optimize images and assets
```

## 🚀 Deployment Commands Summary

```bash
# Backend (Railway)
railway login
railway link
railway up

# Mobile App (EAS)
eas build --platform android --profile production
eas build --platform ios --profile production

# Admin Panel (Vercel)
vercel --prod

# Or automatic deployment via GitHub integration
```

## 📱 App Store Submission

### Android Play Store
1. Create Play Console account ($25 one-time fee)
2. Upload APK/AAB file
3. Complete store listing
4. Submit for review

### iOS App Store
1. Apple Developer account required ($99/year)
2. Upload through Xcode or EAS
3. Complete App Store Connect listing
4. Submit for review

## 🐛 Production Troubleshooting

### Common Issues:
1. **Environment Variables:** Double-check all production env vars
2. **CORS Errors:** Update allowed origins
3. **Database Connection:** Check IP whitelist and connection string
4. **SSL Issues:** Ensure certificates are properly configured
5. **Memory Issues:** Monitor server resources and optimize

### Debugging:
```bash
# Check server logs
railway logs

# Monitor database performance
# Use MongoDB Atlas monitoring

# Check application metrics
# Use APM tools like New Relic or Sentry
```

## 📞 Support & Maintenance

### Regular Maintenance:
- [ ] Update dependencies monthly
- [ ] Monitor security vulnerabilities
- [ ] Backup database regularly
- [ ] Review and rotate API keys
- [ ] Monitor application performance
- [ ] Update SSL certificates

### Emergency Response:
1. Monitor uptime alerts
2. Have rollback plan ready
3. Keep emergency contacts updated
4. Document incident response procedures

---

## 🎉 Congratulations!

Your RankBridge LMS is now deployed to production! 🚀

**Next Steps:**
1. Configure domain names
2. Set up monitoring alerts
3. Create backup strategies
4. Plan for scaling
5. Start onboarding users!

For ongoing support and updates, monitor the GitHub repository and documentation.