# 🚀 Quick Start - Bloomify Firebase Authentication

## Get Your App Running in 5 Minutes!

### Step 1: Get Firebase Config (2 minutes)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or select existing project
3. Click the **Web icon** (`</>`) to add web app
4. Copy the `firebaseConfig` object

### Step 2: Update Configuration (1 minute)

Open `/lib/firebase.ts` and replace this:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};
```

With your actual config:

```typescript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "bloomify-abc123.firebaseapp.com",
  projectId: "bloomify-abc123",
  storageBucket: "bloomify-abc123.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456",
  measurementId: "G-XXXXXXXXXX"
};
```

### Step 3: Enable Authentication (1 minute)

In Firebase Console:
1. Go to **Build** → **Authentication**
2. Click "Get Started"
3. Go to **Sign-in method** tab
4. Click on "Email/Password"
5. Toggle **Enable**
6. Click **Save**

### Step 4: Enable Firestore (1 minute)

In Firebase Console:
1. Go to **Build** → **Firestore Database**
2. Click "Create database"
3. Select **"Start in test mode"**
4. Choose your region
5. Click **Enable**

### Step 5: Test It Out! ✅

1. Start your app: `npm run dev`
2. Click the profile icon (👤) in top right
3. Click "Sign Up" tab
4. Enter your name, email, and password
5. Click "Create Account"
6. Success! You're logged in! 🎉

---

## That's It! 🎊

Your authentication is now fully functional!

### What Works Now:
- ✅ User registration
- ✅ User login
- ✅ User logout
- ✅ Profile display with avatar
- ✅ Password reset
- ✅ Session persistence

### Optional: Enable Social Login

**Google Sign-In:**
1. Firebase Console → Authentication → Sign-in method
2. Click "Google"
3. Toggle Enable
4. Enter support email
5. Save

**GitHub Sign-In:**
1. Create GitHub OAuth App at: https://github.com/settings/developers
2. Get Client ID and Secret
3. Firebase Console → Authentication → Sign-in method
4. Click "GitHub"
5. Paste Client ID and Secret
6. Save

---

## Need Help?

- **Detailed Setup**: See `FIREBASE_SETUP.md`
- **Usage Guide**: See `AUTHENTICATION_GUIDE.md`
- **Firebase Issues**: Check browser console for errors

---

## Verify Everything Works

### Test Checklist:
- [ ] Can create new account
- [ ] Can login with email/password
- [ ] Can see user profile in top right
- [ ] Can click dropdown and see user info
- [ ] Can logout
- [ ] User stays logged in after page refresh
- [ ] Password reset email sends
- [ ] User data appears in Firestore

If all checked ✅ - You're all set! 🚀

---

## Common First-Time Issues

**❌ Error: "Firebase configuration not found"**
- Solution: Update `/lib/firebase.ts` with your actual config

**❌ Error: "Email/password auth not enabled"**
- Solution: Enable Email/Password in Firebase Console → Authentication

**❌ Firestore data not saving**
- Solution: Create Firestore database in Firebase Console

**❌ Social login doesn't work**
- Solution: Enable provider in Firebase Console and configure OAuth

---

## Quick Commands

```bash
# Start development server
npm run dev

# Check for errors
# Open browser console (F12)
```

---

Happy coding! 🌱
