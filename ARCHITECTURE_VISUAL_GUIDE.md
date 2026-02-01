# 🏗️ Bloomify - System Architecture & Visual Guide

---

## 📊 Complete System Architecture

```
┌──────────────────────────────────────────────────────────────────────────┐
│                          USERS & DEVICES                                 │
│  (Desktop, Tablet, Mobile) - Using browsers: Chrome, Firefox, Safari    │
└──────────────────────────────────────────────────────────────────────────┘
                                    ↕
┌──────────────────────────────────────────────────────────────────────────┐
│                    CONTENT DELIVERY NETWORK (CDN)                         │
│              (Cloudflare, Vercel, AWS CloudFront)                        │
│  Caches code & assets near users for SUPER FAST loading worldwide       │
└──────────────────────────────────────────────────────────────────────────┘
                                    ↕
┌──────────────────────────────────────────────────────────────────────────┐
│                      HOSTING PLATFORM                                     │
│                  (Vercel, Firebase, AWS, etc)                           │
│  ┌──────────────────────────────────────────────────────────────┐       │
│  │  FRONTEND SERVER                                             │       │
│  │  Serves:                                                     │       │
│  │  - index.html                                               │       │
│  │  - JavaScript bundles                                       │       │
│  │  - CSS files                                                │       │
│  │  - Images                                                   │       │
│  │  (All built by Vite)                                        │       │
│  └──────────────────────────────────────────────────────────────┘       │
└──────────────────────────────────────────────────────────────────────────┘
                                    ↕
┌──────────────────────────────────────────────────────────────────────────┐
│                    USER'S BROWSER (Client Side)                          │
│  ┌────────────────────────────────────────────────────────────┐         │
│  │             REACT APPLICATION (Frontend)                   │         │
│  │                                                            │         │
│  │  ┌─────────────────────────────────────────────┐          │         │
│  │  │  Components (UI)                            │          │         │
│  │  │  - LandingPage                              │          │         │
│  │  │  - Dashboard                                │          │         │
│  │  │  - Marketplace                              │          │         │
│  │  │  - Community                                │          │         │
│  │  │  - MyGarden                                 │          │         │
│  │  │  - ARScanner                                │          │         │
│  │  └─────────────────────────────────────────────┘          │         │
│  │           ↕ (React Router)                                 │         │
│  │  ┌─────────────────────────────────────────────┐          │         │
│  │  │  State Management                           │          │         │
│  │  │  - AuthContext (who is logged in)          │          │         │
│  │  │  - LanguageContext (what language)          │          │         │
│  │  │  - Component state (react hooks)            │          │         │
│  │  └─────────────────────────────────────────────┘          │         │
│  │           ↕                                                │         │
│  │  ┌─────────────────────────────────────────────┐          │         │
│  │  │  Libraries Used                             │          │         │
│  │  │  - Tailwind CSS (styling)                   │          │         │
│  │  │  - Radix UI (components)                    │          │         │
│  │  │  - Motion (animations)                      │          │         │
│  │  │  - Lucide (icons)                           │          │         │
│  │  │  - React Hook Form (forms)                  │          │         │
│  │  │  - Recharts (graphs)                        │          │         │
│  │  └─────────────────────────────────────────────┘          │         │
│  │                                                            │         │
│  └────────────────────────────────────────────────────────────┘         │
│              ↕ HTTPS (Encrypted Communication)                          │
│  ┌────────────────────────────────────────────────────────────┐         │
│  │             LocalStorage (Browser Memory)                  │         │
│  │  - Auth tokens (for login persistence)                     │         │
│  │  - User preferences                                        │         │
│  │  - Cache (offline support)                                 │         │
│  └────────────────────────────────────────────────────────────┘         │
│                                                                         │
└──────────────────────────────────────────────────────────────────────────┘
                    ↕ API Calls (JSON over HTTPS)
        ┌───────────┴──────────────┬────────────────────┐
        ↓                          ↓                    ↓
┌──────────────────┐   ┌──────────────────┐  ┌──────────────────┐
│  FIREBASE AUTH   │   │ FIRESTORE DB     │  │ CLOUD STORAGE    │
│  (Google Servers)│   │ (Google Servers) │  │ (Google Servers) │
│                  │   │                  │  │                  │
│ Handles:         │   │ Handles:         │  │ Handles:         │
│ - Login          │   │ - User data      │  │ - User avatars   │
│ - Signup         │   │ - Plants         │  │ - Plant photos   │
│ - Password reset │   │ - Posts          │  │ - Files          │
│ - OAuth          │   │ - Comments       │  │                  │
│ - Tokens         │   │ - Messages       │  │                  │
│ - Sessions       │   │ - Leaderboard    │  │                  │
│                  │   │ - Gamification   │  │                  │
└──────────────────┘   └──────────────────┘  └──────────────────┘
        ↓                      ↓                      ↓
   Google Cloud        Google Cloud          Google Cloud
   Infrastructure      Infrastructure        Infrastructure
```

---

## 🔄 Data Flow Diagram

### User Login Flow

```
USER                          FRONTEND                FIREBASE              DATABASE
────────────────────────────────────────────────────────────────────────────────

User enters
email & password
        │
        ├─→ handleLogin()
            function runs
                │
                ├─→ Validates input
                │   (email format?)
                │   (password length?)
                │
                ├─→ Calls Firebase
                    signInWithEmailAndPassword()
                        │
                        └─────────────────→ Firebase Auth API
                                           │
                                           ├─→ Search database
                                           │   for this email
                                           │
                                           ├─→ Check password
                                           │   (hash comparison)
                                           │
                                           ├─→ Create session
                                           │   token (JWT)
                                           │
                                           └─→ Return to app
                                               with token
                        │
        ┌───────────────┴───────────────┐
        │                               │
   SUCCESS                         ERROR
        │                               │
    Token saved in              Error message
    browser memory              shown to user
        │                               │
    AuthContext                   "Invalid
    updated                     credentials"
        │
    currentUser set
    userLoggedIn = true
        │
    Navigation updates
    Dashboard available
        │
    User navigates
    to dashboard
        │
    Dashboard queries
    user's plants
            │
            └──────────────→ Firestore DB
                             │
                             Query:
                             "Get all plants
                              where owner = uid"
                             │
                             Returns array
                             of plant objects
                             │
        ┌────────────────────┘
        │
    React re-renders
    with plant data
        │
    Tailwind styles
    applied
        │
    Motion animations
    trigger
        │
    User sees
    dashboard!
```

---

## 🗂️ Component Hierarchy

```
App.tsx
├── Router
│   ├── Route: /
│   │   └── LandingPage
│   │       ├── HeroSectionCosmic
│   │       ├── FeaturesSection
│   │       ├── InteractiveDemoSection
│   │       ├── AboutSection
│   │       ├── LevelsSection
│   │       ├── TestimonialsSection
│   │       ├── CTASection
│   │       └── Footer
│   │
│   ├── Route: /dashboard
│   │   └── Dashboard
│   │       ├── StatsCards
│   │       ├── ChartSection
│   │       ├── LeaderboardSection
│   │       └── TasksSection
│   │
│   ├── Route: /marketplace
│   │   └── Marketplace
│   │       ├── ProductFilters
│   │       ├── ProductGrid
│   │       │   └── ProductCard (x many)
│   │       └── ShoppingCart
│   │
│   ├── Route: /community
│   │   └── CommunityHub
│   │       ├── PostsList
│   │       │   └── PostCard (x many)
│   │       └── CreatePostForm
│   │
│   ├── Route: /garden
│   │   └── GamificationHub
│   │       ├── LevelDisplay
│   │       ├── PlantList
│   │       │   └── PlantCard (x many)
│   │       └── AchievementsSection
│   │
│   └── Route: /scanner
│       └── ARBalconyScanner
│           ├── CameraView
│           ├── ScanResults
│           └── PlantIdentification
│
├── Navigation (Global)
│   ├── Logo
│   ├── NavLinks
│   └── UserMenu
│
├── AuthModal (Global)
│   ├── LoginForm
│   ├── SignupForm
│   └── PasswordResetForm
│
├── Providers (Global Context)
│   ├── AuthProvider
│   └── LanguageProvider
│
└── Toaster (Notifications)
```

---

## 💾 Database Schema

```
USERS Collection
├─── uid (unique ID)
├─── email
├─── name
├─── bio
├─── avatar (URL to Cloudinary)
├─── joinedDate
├─── level
├─── xp (experience points)
├─── greenPoints
├─── achievements (array of IDs)
├─── language (en, es, fr, etc)
├─── fcmTokens (for notifications)
├─── privacySettings
│   ├─── profilePublic
│   ├─── postPublic
│   └─── shareLocation
└─── preferences
    ├─── theme (dark/light)
    ├─── notifications
    └─── emailFrequency


PLANTS Collection
├─── plantId (unique ID)
├─── owner (user UID)
├─── species
├─── commonName
├─── location
├─── photo (URL to Cloudinary)
├─── health (0-100%)
├─── watering
│   ├─── frequencyDays
│   ├─── lastWatered (timestamp)
│   ├─── schedule (array of days)
│   └─── nextDue
├─── sunlight
│   ├─── hoursNeeded
│   ├─── currentLocation
│   └─── recommendations
├─── soil
│   ├─── type
│   ├─── ph
│   └─── lastChanged
├─── planted (timestamp)
├─── notes (text)
├─── pestIssues (array)
├─── diseaseHistory (array)
├─── growthStage
│   ├─── seedling
│   ├─── developing
│   ├─── mature
│   └─── producing
├─── tags (array)
└─── photos (array of URLs)


COMMUNITY_POSTS Collection
├─── postId (unique ID)
├─── author (user UID)
├─── authorName
├─── authorAvatar
├─── title
├─── content
├─── images (array of Cloudinary URLs)
├─── timestamp
├─── likes (array of user UIDs)
├─── comments (array)
│   ├─── commentId
│   ├─── authorUID
│   ├─── text
│   ├─── timestamp
│   └─── likes
├─── tags (array)
├─── category
│   ├─── tips
│   ├─── showcase
│   ├─── problems
│   ├─── questions
│   └─── discussion
├─── visibility (public/private)
├─── allowComments
└─── reportsCount


MARKETPLACE_PRODUCTS Collection
├─── productId (unique ID)
├─── name
├─── category
│   ├─── plants
│   ├─── seeds
│   ├─── tools
│   ├─── fertilizers
│   ├─── pesticides
│   └─── pots
├─── description
├─── price
├─── originalPrice
├─── images (array)
├─── seller
├─── rating (0-5)
├─── reviews (count)
├─── stock
├─── shipping
│   ├─── cost
│   └─── time
├─── tags (array)
└─── createdDate


GAMIFICATION Collection (per user)
├─── userId (unique ID)
├─── level
├─── totalXp
├─── currentLevelXp
├─── achievements (array)
│   ├─── achievementId
│   ├─── name
│   ├─── description
│   ├─── icon
│   ├─── unlockedDate
│   └─── points
├─── badges (array)
├─── dailyTasks (array)
│   ├─── taskId
│   ├─── description
│   ├─── completed
│   ├─── completedDate
│   ├─── reward
│   └─── dueDate
├─── streaks
│   ├─── wateringStreak
│   ├─── activityStreak
│   └─── communityStreak
├─── leaderboardRank
└─── globalRank
```

---

## 🔐 Authentication Flow

```
┌─────────────────────────────────────────────────────┐
│           BEFORE LOGIN (Public User)                 │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Browser State:                                     │
│  - auth token = null                               │
│  - currentUser = null                              │
│  - userLoggedIn = false                            │
│                                                     │
│  Can Access:                                       │
│  ✓ Landing page                                    │
│  ✓ Public community (read-only)                    │
│                                                     │
│  Cannot Access:                                    │
│  ✗ Dashboard (redirected to login)                 │
│  ✗ My Garden                                       │
│  ✗ Marketplace (view only, no buy)                │
│  ✗ Community (can't post/comment)                 │
│                                                     │
└─────────────────────────────────────────────────────┘
             ↓
    User enters credentials
             ↓
┌─────────────────────────────────────────────────────┐
│         FIREBASE AUTHENTICATION PROCESS              │
├─────────────────────────────────────────────────────┤
│                                                     │
│  1. Email/Password Auth                            │
│     - Credentials → Firebase Auth API              │
│     - Validate in database                         │
│     - Create JWT token                             │
│                                                     │
│  2. OAuth (Google/GitHub)                          │
│     - Open provider login page                     │
│     - User approves                                │
│     - Redirect with auth code                      │
│     - Exchange code for token                      │
│                                                     │
│  3. Create Session                                 │
│     - Generate unique session ID                   │
│     - Store in database                            │
│     - Send to browser                              │
│                                                     │
└─────────────────────────────────────────────────────┘
             ↓
┌─────────────────────────────────────────────────────┐
│         AFTER LOGIN (Authenticated User)             │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Browser State:                                    │
│  - auth token = "eyJhbGc..." (JWT)                │
│  - currentUser = { uid, email, name, ... }       │
│  - userLoggedIn = true                           │
│                                                     │
│  Every Request Now:                               │
│  - Includes auth token in header                  │
│  - Backend validates token                        │
│  - Confirms user is authorized                    │
│                                                     │
│  Can Now Access:                                  │
│  ✓ Dashboard (their own data only)               │
│  ✓ My Garden                                     │
│  ✓ Marketplace (full features)                   │
│  ✓ Community (post, comment, like)               │
│  ✓ Profile page                                  │
│                                                     │
│  Security Rules:                                  │
│  - Can only see own plants                       │
│  - Can only edit own profile                     │
│  - Can only delete own posts                     │
│  - Cannot see other users' private data          │
│                                                     │
└─────────────────────────────────────────────────────┘
             ↓
    User logs out (onClick handler)
             ↓
┌─────────────────────────────────────────────────────┐
│         LOGOUT PROCESS                              │
├─────────────────────────────────────────────────────┤
│                                                     │
│  1. Firebase Auth.signOut()                        │
│  2. Browser clears auth token                      │
│  3. AuthContext resets to null                     │
│  4. User redirected to landing page                │
│  5. Private routes now blocked again               │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## 🚀 Deployment Architecture

```
                        YOUR CODEBASE
                       (GitHub Repo)
                             │
                             │ Push to main
                             ↓
                    ┌─────────────────┐
                    │  GitHub Repo    │
                    │  Code Storage   │
                    └─────────────────┘
                             │
                    ┌────────┴────────┐
                    │                 │
                    ↓                 ↓
        ┌──────────────────┐  ┌──────────────────┐
        │  Vercel Webhook  │  │  Your Computer   │
        │  (Automatic)     │  │  (Manual Deploy) │
        └──────────────────┘  └──────────────────┘
                    │                 │
                    ↓                 ↓
        ┌──────────────────┐  ┌──────────────────┐
        │ 1. Clone code    │  │ 1. npm install   │
        │ 2. npm install   │  │ 2. npm run build │
        │ 3. npm run build │  │ 3. Deploy build/ │
        │ 4. Run tests     │  │                  │
        │ 5. Build Docker  │  └──────────────────┘
        │ 6. Deploy        │
        └──────────────────┘
                    │
                    ↓
        ┌──────────────────┐
        │  Vercel Servers  │
        │  (Multiple       │
        │   Locations)     │
        └──────────────────┘
                    │
        ┌───────────┼───────────┐
        ↓           ↓           ↓
    USA East   Europe       Asia
    Server     Server       Server
        │           │           ↓
        └───────────┴───────────┐
                    │
                    ↓
        ┌──────────────────┐
        │  CDN             │
        │  Caches & Serves │
        │  Worldwide       │
        └──────────────────┘
                    │
        ┌───────────┼───────────┐
        ↓           ↓           ↓
    User in   User in     User in
    US        Europe      Asia
    (Fast!)   (Fast!)     (Fast!)
```

---

## 📱 Mobile-First Design

```
Responsive Breakpoints:
════════════════════════════════════════════════

Mobile (< 768px)
├── Single column layout
├── Full-width cards
├── Bottom navigation
├── Large touch targets (48px+)
├── Simplified forms
└── Optimized images (small file sizes)

Tablet (768px - 1024px)
├── Two column layout
├── Sidebar + content
├── Medium spacing
├── Touch-friendly UI
└── Regular image sizes

Desktop (> 1024px)
├── Multi-column layout
├── Full sidebar navigation
├── Large spacing
├── Hover effects
└── Full resolution images


Media Queries Used:
════════════════════════════════════════════════

Tailwind Breakpoints:
sm:  640px   - Small devices
md:  768px   - Tablets
lg:  1024px  - Laptops
xl:  1280px  - Large desktops
2xl: 1536px  - Very large screens

Example Usage:
<div className="
  text-sm md:text-base lg:text-lg
  p-2 md:p-4 lg:p-6
  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
">
  Responsive content!
</div>
```

---

## 🔗 API Integration Points

```
FRONTEND CALLS TO FIREBASE:
════════════════════════════════════════════════

┌─ Authentication ─────────────────────┐
│ POST /auth/signup                    │
│ POST /auth/login                     │
│ POST /auth/loginWithGoogle           │
│ POST /auth/loginWithGithub           │
│ POST /auth/logout                    │
│ POST /auth/passwordReset             │
│ GET /auth/currentUser                │
└──────────────────────────────────────┘

┌─ User Data ──────────────────────────┐
│ GET /users/{uid}                     │
│ PUT /users/{uid}                     │
│ POST /users/{uid}/avatar             │
│ GET /users/{uid}/profile             │
│ POST /users/{uid}/follow             │
│ DELETE /users/{uid}/follow/{targetId}│
└──────────────────────────────────────┘

┌─ Plants ─────────────────────────────┐
│ POST /plants                         │
│ GET /plants/{uid}                    │
│ PUT /plants/{id}                     │
│ DELETE /plants/{id}                  │
│ POST /plants/{id}/water              │
│ POST /plants/{id}/photo              │
└──────────────────────────────────────┘

┌─ Community ──────────────────────────┐
│ POST /community/posts                │
│ GET /community/posts                 │
│ GET /community/posts/{id}            │
│ PUT /community/posts/{id}            │
│ DELETE /community/posts/{id}         │
│ POST /community/posts/{id}/like      │
│ POST /community/posts/{id}/comment   │
└──────────────────────────────────────┘

┌─ Marketplace ────────────────────────┐
│ GET /marketplace/products            │
│ GET /marketplace/products/{id}       │
│ POST /marketplace/cart               │
│ POST /marketplace/orders             │
│ GET /marketplace/orders/{uid}        │
│ POST /marketplace/reviews            │
└──────────────────────────────────────┘

┌─ Gamification ───────────────────────┐
│ GET /gamification/user/{uid}         │
│ POST /gamification/tasks/complete    │
│ GET /gamification/leaderboard        │
│ POST /gamification/achievement/claim │
└──────────────────────────────────────┘
```

---

## 🎯 Request/Response Cycle

```
FRONTEND                    FIREBASE
═════════════════════════════════════════════════════

1. User Action
   (click button)
        │
        ↓
2. Event Handler
   function runs
        │
        ↓
3. Prepare Data
   (validate input)
        │
        ↓
4. Make Request
   (API call)
   ├─ Method: GET/POST/PUT/DELETE
   ├─ URL: /api/plants
   ├─ Headers:
   │   Authorization: token
   │   Content-Type: application/json
   └─ Body: { data... }
        │
        ├─────────────────────────→ Firebase Server
        │
                              │
                              ↓
                         5. Receive Request
                            │
                            ↓
                         6. Validate Token
                            ("Is this user authorized?")
                            │
                            ├─ Yes → Continue
                            └─ No  → Return 401
                            │
                            ↓
                         7. Process Request
                            - Query database
                            - Update records
                            - Run logic
                            │
                            ↓
                         8. Prepare Response
                            {
                              "success": true,
                              "data": {...},
                              "timestamp": 1234567890
                            }
                            │
        ┌───────────────────┘
        │
        ↓
5. Receive Response
   (in then/catch block)
        │
        ↓
6. Update State
   setData(response)
        │
        ↓
7. Re-render Component
   (React updates UI)
        │
        ↓
8. User Sees Update!
```

---

## 🔄 CI/CD Pipeline (Continuous Integration/Deployment)

```
Developer Workflow:
═════════════════════════════════════════════════════

1. Write Code Locally
   ├── npm run dev
   └── Test in browser
        │
        ↓
2. Commit & Push
   git commit -m "Add feature X"
   git push origin feature/x
        │
        ↓
3. Create Pull Request
   (on GitHub)
   ├── Code review
   ├── Tests run
   └── Deploy preview
        │
        ↓
4. Merge to Main
   ├── Automated tests
   ├── Linting checks
   └── Build verification
        │
        ↓
5. Deploy to Production
   (Automatic via Vercel)
   ├── Build code
   ├── Run tests
   ├── Push to CDN
   └── Update servers
        │
        ↓
6. Live!
   ├── Users see changes
   ├── Monitor errors
   └── Track performance
```

---

**Document Status:** Complete  
**Diagrams:** Implemented  
**Visual Aids:** ASCII & Text-based  
**Last Updated:** January 28, 2026
