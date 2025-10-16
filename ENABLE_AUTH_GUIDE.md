# 🔐 Enable Firebase Authentication

## The Issue
Firebase Authentication is not enabled in your project. You're seeing this error:
```
identitytoolkit.googleapis.com/v1/accounts:signUp?key=... Failed to load resource: 400
```

## 🚀 Quick Fix (2 minutes)

### Step 1: Open Firebase Console
Visit: https://console.firebase.google.com/project/rahbar-dcd4a/authentication

### Step 2: Enable Email/Password Authentication
1. Click on **"Get Started"** or **"Sign-in method"** tab
2. Find **"Email/Password"** in the list of providers
3. Click on it
4. Toggle **"Enable"** to ON
5. Click **"Save"**

### Step 3: Test the App
1. Visit: https://rahbar-dcd4a.web.app
2. Click **"Get Started"** or **"Sign Up"**
3. Fill in the form and create your account
4. You should now be able to sign up successfully!

---

## Alternative: Enable via Firebase CLI

If you prefer to use the command line, I can help you set it up programmatically, but the console method above is faster and easier.

---

**After enabling authentication, the signup will work perfectly! ✅**

