# 🔒 Security Configuration Guide

## Firebase Security Best Practices

### ⚠️ Important Security Notes

**Firebase API Keys are Safe to Expose:**
- Firebase API keys are **NOT** secret keys
- They are meant to be public and included in client-side code
- Security is enforced through **Firebase Security Rules**, not API key hiding
- The API key only identifies your Firebase project, not authenticates users

### 🛡️ Real Security Measures

1. **Firestore Security Rules** - Control database access
2. **Authentication Rules** - Manage user permissions  
3. **Firebase Functions** - Server-side logic protection
4. **Environment Variables** - Keep sensitive data separate

## 🔧 Environment Setup

### 1. Create `.env` File
Create a `.env` file in your project root:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your-app-id

# Gemini AI Configuration
VITE_GEMINI_API_KEY=your-gemini-api-key

# Other API Keys
VITE_OPENWEATHER_API_KEY=your-openweather-api-key
```

### 2. Never Commit `.env` Files
The `.gitignore` file already excludes:
- `.env`
- `.env.local`
- `.env.development.local`
- `.env.test.local`
- `.env.production.local`

### 3. Production Environment Variables
For production deployment, set environment variables in your hosting platform:

**Firebase Hosting:**
```bash
firebase functions:config:set app.gemini_api_key="your-key"
```

**Vercel:**
```bash
vercel env add VITE_GEMINI_API_KEY
```

**Netlify:**
- Add environment variables in Netlify dashboard

## 🔐 Firebase Security Rules

### Firestore Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read/write their own data
    match /analyses/{document} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    
    // Allow authenticated users to manage their own user profiles
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Public read access for development (remove in production)
    match /{document=**} {
      allow read: if true;
    }
  }
}
```

### Authentication Rules
- Enable authentication providers in Firebase Console
- Configure authorized domains
- Set up user permissions

## 🚨 Security Checklist

### ✅ Development
- [ ] `.env` file created with all required variables
- [ ] `.env` file added to `.gitignore`
- [ ] No hardcoded secrets in source code
- [ ] Firebase Security Rules configured
- [ ] Authentication enabled and configured

### ✅ Production
- [ ] Environment variables set in hosting platform
- [ ] Firebase Security Rules tightened
- [ ] Authentication providers configured
- [ ] HTTPS enabled
- [ ] CORS configured properly

## 🔍 Monitoring & Alerts

### Firebase Console Monitoring
1. **Authentication** - Monitor user sign-ins
2. **Firestore** - Track database access
3. **Functions** - Monitor server-side execution
4. **Hosting** - Check deployment status

### Security Alerts
Set up alerts for:
- Unusual authentication patterns
- High database read/write volumes
- Failed authentication attempts
- Function execution errors

## 📚 Additional Resources

- [Firebase Security Rules Documentation](https://firebase.google.com/docs/rules)
- [Firebase Authentication Security](https://firebase.google.com/docs/auth/security-checklist)
- [Environment Variables Best Practices](https://12factor.net/config)
- [OWASP Security Guidelines](https://owasp.org/www-project-top-ten/)

## ⚡ Quick Security Commands

```bash
# Deploy security rules
firebase deploy --only firestore:rules

# Check Firebase project status
firebase projects:list

# View current security rules
firebase firestore:rules

# Deploy with environment variables
firebase functions:config:set app.gemini_api_key="your-key"
firebase deploy --only functions
```

---

**Remember: Security is about proper configuration, not hiding API keys! 🔒**
