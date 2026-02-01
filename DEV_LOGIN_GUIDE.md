# 🔐 Dev Mode Login Guide

## Quick Access - No Firebase Required!

Your Bloomify app is now configured for **free development access** without Firebase verification.

### Login Credentials

**Username**: `admin`  
**Password**: `admin`

### How It Works

1. **Open your browser**: http://localhost:3001/
2. **Click "Login"** on the landing page
3. **Enter credentials**:
   - Email: `admin`
   - Password: `admin`
4. **Press Enter** - You're in! ✅

### What Changed

The authentication system has been modified to:

✅ **Allow admin/admin login** - Bypasses Firebase entirely  
✅ **Store session in localStorage** - Persists across page refreshes  
✅ **Remove Firebase verification** - No email validation needed  
✅ **Work in offline mode** - No Firebase connection required  

### Technical Details

**Modified Files**:
1. `src/contexts/AuthContext.tsx` - Dev mode user detection
2. `src/lib/auth/login.ts` - Admin credentials bypass
3. `src/lib/auth/logout.ts` - Dev mode logout support

### Features Available

Once logged in as admin, you have full access to:
- ✅ Dashboard
- ✅ Garden tracking
- ✅ Plant recommendations
- ✅ Community features
- ✅ Gamification
- ✅ All modals and forms
- ✅ User profile

### Session Persistence

Your login session persists because it's stored in localStorage:
- **Refresh the page** - Still logged in ✅
- **Close and reopen browser** - Still logged in ✅
- **Click logout** - Session cleared

### Logout

Click the **"Logout"** button in the navigation menu to clear your session.

### Return to Normal Firebase Auth

When you want to revert to normal Firebase authentication:

1. **Edit `src/lib/auth/login.ts`**
   - Remove the admin/admin check
   
2. **Edit `src/contexts/AuthContext.tsx`**
   - Remove the localStorage dev user check

3. **Restart the dev server**
   - `npm run dev`

---

## Quick Start

```
1. Open: http://localhost:3001/
2. Login with:
   - Email: admin
   - Password: admin
3. Enjoy full app access!
```

No Firebase setup needed for development! 🚀
