# BLOOMIFY USER JOURNEY MAP
**Version 1.0** | Created: January 30, 2026 | Status: Foundation Layer

---

## 📋 TABLE OF CONTENTS
1. [Journey Overview](#journey-overview)
2. [Landing Page Journey](#1-landing-page-journey)
3. [Authentication Journey](#2-authentication-journey)
4. [Dashboard Journey](#3-dashboard-journey)
5. [Feature Journeys](#4-feature-journeys)
6. [Community Journey](#5-community-journey)
7. [Marketplace Journey](#6-marketplace-journey)
8. [Exit Journeys](#7-exit-journeys)

---

## JOURNEY OVERVIEW

### Current User Flow Architecture
```
LANDING PAGE (Home)
    ↓
[Authentication Decision]
    ├─→ SIGN UP → DASHBOARD
    ├─→ LOGIN → DASHBOARD
    └─→ CONTINUE AS GUEST
         ├─→ VIEW FEATURES
         ├─→ VIEW COMMUNITY
         └─→ VIEW MARKETPLACE
```

### All Available Routes
| Route | Component | Auth Required | Purpose |
|-------|-----------|--------------|---------|
| `/` | LandingPage | No | Marketing & Onboarding |
| `/dashboard` | Dashboard | Yes | Plant Management Hub |
| `/garden` | GamificationHub | Yes | Gamification & Leveling |
| `/community` | CommunityHub | No | Social & Sharing |
| `/marketplace` | Marketplace | No | Browse & Purchase |
| `/scanner` | ARBalconyScanner | Yes | AR Scanning Feature |

---

## 1. LANDING PAGE JOURNEY

### User Entry Point: Cold Landing
**URL:** `/`  
**State:** Unauthenticated (First Time Visitor)

#### Phase 1: Visual Discovery (Hero Section)
```
USER LANDS ON PAGE
    ↓
HERO SECTION - "BLOOMIFY COSMIC"
├─ Immersive hero with cosmic theme
├─ CTA: "Grow Your Urban Garden"
├─ CTA: "Explore Features"
└─ CTA: "Sign In / Create Account" → AuthModal opens
    
KEY INTERACTIONS:
- Logo click → Scroll to top
- Hero CTA buttons → AuthModal / Feature scroll
```

#### Phase 2: Awareness & Education (Features)
```
FEATURES SECTION
├─ Plant Management
│  └─ Water tracking, nutrient management, health monitoring
├─ Gamification System
│  └─ Leveling, XP, achievements, streaks
├─ AR Technology
│  └─ Balcony scanning, plant identification
├─ Community Hub
│  └─ Share gardens, tips, connect with others
└─ Marketplace
   └─ Buy plants, seeds, equipment

USER ACTION:
- Scroll through features
- Hover over feature cards for details
- [OPTIONAL] Click "Learn More" within feature
```

#### Phase 3: Interactive Engagement
```
INTERACTIVE DEMO SECTION
├─ 3D Model Visualization
├─ Feature preview/simulation
└─ Engage with interactive elements

USER ACTION:
- Interact with 3D models
- See feature in action
- Build confidence in product
```

#### Phase 4: Social Proof
```
ABOUT SECTION
├─ Mission statement: "Bring nature to urban spaces"
├─ Impact metrics: Users, plants grown, CO2 offset
└─ User testimonials

TESTIMONIALS SECTION
├─ Real user stories
├─ Avatar + rating system
└─ Emotional connection

USER ACTION:
- Read stories
- See social proof
- Increase trust
```

#### Phase 5: Gamification Appeal
```
LEVELS SECTION
├─ Beginner (Level 1-5)
│  └─ Basic plant care learning
├─ Intermediate (Level 6-15)
│  └─ Advanced care techniques
├─ Expert (Level 16-25)
│  └─ Community leadership
└─ Master Gardener (Level 26+)
   └─ All unlocks, full platform access

USER ACTION:
- Review leveling system
- Understand progression path
- Feel motivated to join
```

#### Phase 6: Call-to-Action
```
CTA SECTION
├─ "Start Growing Today"
├─ "Join 10,000+ Gardeners"
└─ "Get Premium Access"

USER ACTION:
- Click CTA → AuthModal
- Decide to sign up or skip
```

#### Phase 7: Final Elements
```
FOOTER
├─ Company links
├─ Social media links
├─ Newsletter signup
├─ Terms & Privacy
└─ Language selector

FLOATING USER STATION
├─ Mini profile (if logged in)
├─ Quick actions
└─ Persistent throughout page

USER ACTION:
- Continue scrolling
- Access footer links
- Subscribe to newsletter
```

### Landing Page Micro-Interactions
```
ON PAGE LOAD:
- Smooth scroll animations
- Staggered element reveals
- Background particle effects
- Gradient animations

ON SCROLL:
- Parallax effects
- Section fade-ins
- Icon animations
- Number counters

ON HOVER:
- Card lift effects
- Icon color changes
- Gradient shifts
- Highlight states
```

---

## 2. AUTHENTICATION JOURNEY

### Entry Points to Auth
```
FROM LANDING PAGE:
├─ Hero CTA → "Get Started"
├─ Feature CTA → "Start Free"
├─ CTA Section → "Start Growing Today"
└─ Navigation → "Sign In" button

FROM PROTECTED ROUTES:
├─ Attempt to visit /dashboard → AuthModal
├─ Attempt to visit /garden → AuthModal
└─ Attempt to visit /scanner → AuthModal
```

### Auth Modal Flow
```
AUTHMODAL OPENS
    ↓
[User has account?]
    ├─→ YES → Login Tab
    │  ├─ Email input
    │  ├─ Password input
    │  ├─ "Forgot Password?" link
    │  ├─ "Login" button
    │  └─ "Create Account" tab switcher
    │
    └─→ NO → Sign Up Tab
       ├─ Full Name input
       ├─ Email input
       ├─ Password input (with strength indicator)
       ├─ Confirm Password input
       ├─ Terms acceptance checkbox
       ├─ "Create Account" button
       └─ "Already have account?" tab switcher
```

### Post-Authentication Actions
```
SUCCESSFUL LOGIN/SIGNUP
    ↓
[Check user profile completeness]
    ├─→ Profile complete → Redirect to Dashboard
    ├─→ Profile incomplete → Show Profile Setup modal
    │  ├─ Avatar upload
    │  ├─ Bio
    │  ├─ Preferred plants
    │  └─ Location info
    └─→ First time user → Show Onboarding tutorial
       ├─ Dashboard walkthrough
       ├─ Plant care basics
       └─ Gamification explanation
```

### Auth Context Updates
```
AFTER LOGIN:
- currentUser object populated
- userLoggedIn = true
- Protected routes become accessible
- Navigation updates to show:
  ├─ Dashboard link (now visible)
  ├─ Garden link (now visible)
  ├─ User avatar dropdown
  └─ Logout option
```

---

## 3. DASHBOARD JOURNEY

### Dashboard Entry
**URL:** `/dashboard`  
**State:** Authenticated only  
**Context:** User's personal plant management hub

### Dashboard Structure
```
DASHBOARD HERO
├─ Welcome message: "Welcome back, [User]!"
├─ Quick stats overview
└─ Today's tasks summary

MAIN CONTENT AREA
├─ Left Sidebar (Navigation)
│  ├─ My Plants
│  ├─ Calendar
│  ├─ Achievements
│  ├─ Settings
│  └─ Help
│
├─ Center Content (Depends on active section)
│
└─ Right Sidebar (Quick Actions)
   ├─ Today's Tasks
   ├─ Recent Activity
   └─ Quick Tips
```

### Dashboard Sections Journey

#### Section A: My Plants Overview
```
MY PLANTS GRID VIEW
    ↓
[User sees all their plants]
    ├─ Plant Card (per plant)
    │  ├─ 3D Model viewer
    │  ├─ Health status (%)
    │  ├─ Watering status
    │  ├─ Last care time
    │  ├─ Quick actions (Water, Check Health)
    │  └─ "Manage" button → Plant Detail Modal
    │
    └─ "Add New Plant" button
       └─ Plant Selection modal
          ├─ Browse plant database
          ├─ AI recommendations
          └─ Select & Add

PLANT DETAIL MODAL:
├─ 3D Model viewer (full)
├─ Plant info (species, origin, care requirements)
├─ Care history timeline
├─ Health metrics chart
├─ Watering schedule
├─ Notes & observations
└─ Care actions:
   ├─ Water
   ├─ Fertilize
   ├─ Prune
   ├─ Check health
   └─ Remove plant
```

#### Section B: Daily Tasks & Streaks
```
TODAY'S TASKS WIDGET
├─ Task list for today
│  └─ Each task: [Checkbox] Task Name [XP Reward] [Status]
├─ Task completion rate (%)
├─ Streak counter
│  ├─ Current streak: X days
│  └─ Best streak: X days
└─ Rewards for completing tasks
   └─ XP earned this session

USER INTERACTION:
├─ Check off task → Task marked complete
├─ Receive XP notification
├─ See streak counter update
└─ Unlock achievement (if applicable)
```

#### Section C: Statistics & Analytics
```
DASHBOARD STATS CARDS:
├─ Plants Owned: 12
├─ Healthy Plants: 9/12
├─ Watering Streak: 7 days
├─ Current Level: 15
├─ XP Progress: 3450/5000
├─ Green Points: 18,750
├─ Achievements: 24/100
└─ Week overview chart

USER INTERACTION:
- Hover over cards for details
- Click to see breakdown
- See trends and progress
```

#### Section D: Activity Feed
```
RECENT ACTIVITY LOG:
├─ Action: "PROTOCOL INITIATED"
│  └─ Plant: "TULSI UNIT 01" | Time: "2H AGO" | XP: +50
├─ Action: "NUTRIENT SYNC"
│  └─ Plant: "SNAKE PLANT ALPHA" | Time: "5H AGO" | XP: +75
├─ Action: "MONSOON ALERT"
│  └─ Plant: "HUMIDITY DETECTED" | Time: "24H AGO" | XP: +100
└─ Action: "HYDRATION LOGGED"
   └─ Plant: "ALOE UNIT 1" | Time: "24H AGO" | XP: +50

USER INTERACTION:
- Review activity history
- See XP accumulation
- Understand plant changes
- Click activity → Plant detail view
```

#### Section E: Care Calendar
```
CALENDAR VIEW:
├─ Monthly calendar display
├─ Color-coded care events
│  ├─ Green: Watering day
│  ├─ Blue: Fertilizing
│  ├─ Yellow: Health check
│  └─ Red: Alert/Issue
├─ Click day → See scheduled tasks
└─ Add custom care event

USER INTERACTION:
- Navigate months
- View scheduled care
- Reschedule if needed
- Set reminders
```

---

## 4. FEATURE JOURNEYS

### Feature A: AR Balcony Scanner

**URL:** `/scanner`  
**Requirements:** Authenticated + Camera access

#### Scanner Journey
```
USER NAVIGATES TO SCANNER
    ↓
CAMERA PERMISSION REQUEST
├─ Browser requests camera access
└─ User grants/denies

[If granted]:
SCANNER INTERFACE LOADS
├─ Live camera feed
├─ AR overlay grid
├─ Scan button (center)
└─ Back button

USER ACTION: SCAN BALCONY
├─ Point camera at balcony
├─ Press scan button
├─ Processing animation
│  └─ "Analyzing 3D geometry..."
│
├─ Results displayed:
│  ├─ Balcony dimensions
│  ├─ Sunlight analysis
│  ├─ Space available for plants
│  ├─ Recommended plants
│  └─ Layout suggestions
│
└─ User actions:
   ├─ Save scan result
   ├─ Share with community
   ├─ Add recommended plants
   └─ Dismiss results

[If denied]:
FALLBACK INTERFACE
├─ Manual balcony measurement form
├─ Upload reference image
└─ Manual plant suggestion
```

### Feature B: Gamification Hub (Garden)

**URL:** `/garden`  
**Requirements:** Authenticated

#### Gamification Journey
```
USER NAVIGATES TO GARDEN
    ↓
GAMIFICATION HUB LOADS
├─ User's garden visualization
├─ Profile card with stats
└─ Navigation tabs

TAB 1: LEVELS
├─ Current level: 15 / 50
├─ XP progress bar: 3450 / 5000
├─ Level description & unlocks
│  └─ "Unlock premium plant varieties at Level 20"
│
├─ Level history:
│  └─ Date achieved, milestone description
│
└─ XP earning opportunities:
   ├─ Daily care tasks: +50-75 XP
   ├─ Achievement unlocks: +100-500 XP
   ├─ Community contributions: +25-200 XP
   └─ Challenge completions: +150-300 XP

USER ACTION:
- View level requirements
- Click "How to earn XP" → Info modal
- Share achievements

TAB 2: ACHIEVEMENTS
├─ Achievement grid (100 total)
│  ├─ Locked: Grayed out, shows requirements
│  ├─ Unlocked: Highlighted with date
│  └─ In Progress: Shows progress bar
│
├─ Achievement categories:
│  ├─ Care Master (watering, nutrition)
│  ├─ Collector (plant varieties)
│  ├─ Social Butterfly (community)
│  ├─ Challenge Warrior (events)
│  └─ Rare (secret achievements)
│
└─ Achievement details on click:
   ├─ Name & description
   ├─ Icon & rarity
   ├─ Progress (if not unlocked)
   └─ Share button

TAB 3: CHALLENGES
├─ Weekly challenges:
│  └─ "30-Day Plant Streak" | 5/30 complete | +500 XP reward
│
├─ Monthly challenges:
│  └─ "Grow 5 different species" | 2/5 complete | +1000 XP
│
├─ Seasonal challenges:
│  └─ "Winter Survival Challenge" | Timer: 28 days left | +2000 XP
│
└─ User actions:
   ├─ Join challenge → Accept terms
   ├─ Track progress
   ├─ View leaderboard
   └─ Claim rewards when complete

TAB 4: LEADERBOARD
├─ Global rankings by:
│  ├─ Total XP (Lifetime)
│  ├─ Weekly XP
│  ├─ Plants Owned
│  ├─ Achievements
│  └─ Streak Days
│
├─ Friends rankings
│  └─ Compare with connected users
│
├─ Your rank:
│  └─ "#1,234 Global | #45 Your Region"
│
└─ User actions:
   ├─ Click user → View profile
   ├─ Send friend request
   └─ View their garden
```

---

## 5. COMMUNITY JOURNEY

**URL:** `/community`  
**Requirements:** None (open to guests, enhanced for logged-in users)

#### Community Journey
```
USER NAVIGATES TO COMMUNITY HUB
    ↓
COMMUNITY INTERFACE LOADS
├─ Featured users/gardens
├─ Recent posts/shares
└─ Community stats

SECTION 1: FEED/POSTS
├─ View community posts:
│  ├─ User avatar + name
│  ├─ Garden photo/3D view
│  ├─ Caption/description
│  ├─ Likes count
│  ├─ Comments count
│  └─ Actions: Like, Comment, Share
│
├─ [If logged in] Create post:
│  └─ "Share your garden" → Post creation modal
│     ├─ Upload photo/3D model
│     ├─ Write caption
│     ├─ Add tags (#plants, #gardening)
│     ├─ Set privacy (Public/Friends/Private)
│     └─ Post button

USER INTERACTION:
- Scroll through feed
- Like posts → Heart animation + count update
- Click to comment → Comment modal
- Share post → Copy link / Social share

SECTION 2: COMMUNITY CHAT
├─ Topic-based channels:
│  ├─ #general - Introductions & greetings
│  ├─ #care-tips - Plant care advice
│  ├─ #challenges - Challenge discussions
│  ├─ #marketplace-deals - Swaps & sales
│  └─ #showcase - Garden showcases
│
├─ Direct messages:
│  └─ Chat with other gardeners
│
└─ [If logged in] Send message:
   └─ Type message → Send

USER INTERACTION:
- Read messages
- Real-time updates
- Search conversations
- Pin important messages

SECTION 3: USER PROFILES
├─ User card displays:
│  ├─ Avatar + name
│  ├─ Level & XP
│  ├─ Plants owned count
│  ├─ Bio
│  ├─ Location
│  ├─ Join date
│  ├─ Achievements badge
│  └─ Follow/Message buttons
│
└─ Click profile → Detailed profile view:
   ├─ Full bio
   ├─ Garden showcase (3D models)
   ├─ Recent activity
   ├─ Shared tips
   └─ Message button

SECTION 4: FEATURED GARDENS
├─ Curated garden showcases:
│  ├─ Garden name
│  ├─ Owner profile
│  ├─ 3D visualization
│  ├─ Plant count
│  ├─ Story/description
│  └─ View details button
│
└─ Click garden → Detailed view:
   ├─ Full 3D tour
   ├─ Plant list with details
   ├─ Owner's care tips
   ├─ Comments section
   └─ Save to favorites
```

---

## 6. MARKETPLACE JOURNEY

**URL:** `/marketplace`  
**Requirements:** None (viewing), Authentication (purchasing)

#### Marketplace Journey
```
USER NAVIGATES TO MARKETPLACE
    ↓
MARKETPLACE LOADS
├─ Featured products
├─ Search bar
├─ Filter sidebar
└─ Product grid

SECTION 1: BROWSING PRODUCTS
├─ Products displayed by category:
│  ├─ PLANTS
│  │  ├─ Indoor plants
│  │  ├─ Outdoor plants
│  │  ├─ Succulents
│  │  └─ Rare varieties
│  │
│  ├─ SEEDS & SAPLINGS
│  │  ├─ Vegetable seeds
│  │  ├─ Flower seeds
│  │  └─ Herb seeds
│  │
│  ├─ SOIL & NUTRIENTS
│  │  ├─ Potting soil
│  │  ├─ Fertilizers
│  │  ├─ Amendments
│  │  └─ pH testers
│  │
│  └─ TOOLS & EQUIPMENT
│     ├─ Pots & planters
│     ├─ Watering cans
│     ├─ Pruning tools
│     └─ Grow lights
│
├─ Product card shows:
│  ├─ Image
│  ├─ Name & description
│  ├─ Price
│  ├─ Rating & reviews
│  ├─ Stock status
│  └─ "Add to cart" button
│
└─ Filters available:
   ├─ Price range
   ├─ Rating
   ├─ Availability
   ├─ Difficulty level
   └─ Care requirements

USER INTERACTION:
- Search products
- Filter & sort
- Hover for quick view
- Click product → Product detail view

SECTION 2: PRODUCT DETAILS
├─ Large image gallery
├─ Product info:
│  ├─ Name, description, specifications
│  ├─ Pricing & discounts
│  ├─ Stock availability
│  ├─ Shipping info
│  ├─ Care instructions (if plant)
│  ├─ Recommended companion products
│  └─ "Add to cart" button
│
├─ Reviews section:
│  ├─ Average rating (1-5 stars)
│  ├─ Review count
│  ├─ Customer reviews:
│  │  ├─ Rating & title
│  │  ├─ Review text
│  │  ├─ Reviewer name & avatar
│  │  └─ Helpful count
│  │
│  └─ [If logged in] Write review:
│     └─ Add own review/rating
│
└─ Recommendations:
   └─ "Customers also bought" section

USER INTERACTION:
- Read product details
- Check reviews
- Add to cart
- Share product
- Add to wishlist

SECTION 3: SHOPPING CART (If logged in)
├─ Cart icon with item count
├─ Cart slide-out/modal shows:
│  ├─ Product list:
│  │  ├─ Product image
│  │  ├─ Name & details
│  │  ├─ Price
│  │  ├─ Quantity adjuster
│  │  └─ Remove button
│  │
│  ├─ Cart summary:
│  │  ├─ Subtotal
│  │  ├─ Shipping estimate
│  │  ├─ Tax estimate
│  │  └─ Total
│  │
│  └─ Action buttons:
│     ├─ "Continue Shopping"
│     └─ "Proceed to Checkout"
│
└─ Checkout flow:
   ├─ Shipping address
   ├─ Payment method
   ├─ Order review
   └─ Confirmation

USER INTERACTION:
- Add/remove items
- Adjust quantities
- Apply coupon codes
- Proceed to checkout
- Complete purchase
```

---

## 7. EXIT JOURNEYS

### Exit Point A: Navigation Logout
```
USER CLICKS PROFILE DROPDOWN
    ↓
DROPDOWN MENU APPEARS
├─ User name & email
├─ "View Profile" → Profile page
├─ "Settings" → Settings page
├─ "Help & Support" → Help center
└─ "Logout" button
    ↓
USER CLICKS LOGOUT
    ↓
LOGOUT PROCESS:
├─ Clear auth token
├─ Clear user context
├─ Redirect to landing page
└─ Show toast: "Logged out successfully"
    ↓
STATE:
├─ userLoggedIn = false
├─ currentUser = null
├─ Protected routes inaccessible
└─ Navigation updates (Dashboard/Garden hidden)
```

### Exit Point B: Session Timeout
```
USER INACTIVE FOR X MINUTES
    ↓
SESSION EXPIRES
    ↓
AUTOMATIC LOGOUT:
├─ Clear session
├─ Redirect to landing page
└─ Show modal: "Session expired, please login again"
    ↓
USER MUST RE-AUTHENTICATE
```

### Exit Point C: Browser Leave
```
USER CLOSES BROWSER/TAB
    ↓
SESSION PERSISTED:
├─ Firebase session storage
├─ Local auth token
└─ Next visit auto-restores login
    ↓
[If token expired]:
└─ Show re-auth prompt on next visit
```

---

## 8. INTERACTION PATTERNS

### Global Interactions Available on All Pages

#### 1. Navigation Bar (Fixed Top)
```
ALWAYS AVAILABLE:
├─ Bloomify logo → Home
├─ Navigation links (with protection):
│  ├─ Overview (public)
│  ├─ Dashboard (protected)
│  ├─ Garden (protected)
│  ├─ Community (public)
│  ├─ Marketplace (public)
│  └─ Language selector
│
└─ User actions:
   ├─ Not logged in: "Sign In" button
   └─ Logged in: Profile dropdown
```

#### 2. Floating UI Elements
```
ALWAYS AVAILABLE:
├─ Floating user station (mini profile)
├─ Notification center (if logged in)
├─ Help/Chat widget
└─ Theme toggle (if available)
```

#### 3. Toast Notifications
```
TRIGGERED BY ACTIONS:
├─ Login/logout success
├─ Error messages
├─ Task completion
├─ New messages
├─ Achievement unlocks
└─ Cart updates
```

#### 4. Modals & Overlays
```
USED FOR:
├─ Authentication
├─ Plant management
├─ Task creation
├─ Share/invite
├─ Confirmations
└─ Detailed information
```

---

## NEXT STEPS: PLANNED ENHANCEMENTS

### Phase 2: Hooks & Event Tracking
- [ ] Define critical user actions to track
- [ ] Implement analytics events
- [ ] Create conversion funnels
- [ ] Track feature adoption

### Phase 3: Navigation Flow Refinement
- [ ] Detailed state management
- [ ] Back/forward button behavior
- [ ] Breadcrumb trails
- [ ] Smart redirects

### Phase 4: Personalization Hooks
- [ ] User preference tracking
- [ ] Recommendation engine
- [ ] Adaptive content
- [ ] A/B testing framework

### Phase 5: Advanced Interactions
- [ ] Micro-interactions detail
- [ ] Animation specifications
- [ ] Loading states
- [ ] Error recovery flows

---

## 📊 JOURNEY METRICS TO TRACK

```
LANDING PAGE:
├─ Page load time
├─ Scroll depth
├─ Feature section views
├─ CTA clicks (Sign up, Learn more)
├─ Hero button engagement
└─ Time to first action

AUTHENTICATION:
├─ Sign-up completion rate
├─ Login success rate
├─ Password reset usage
├─ Auth modal views
└─ Abandonment rate

DASHBOARD:
├─ Plant actions (water, fertilize)
├─ Task completion rate
├─ Time spent in dashboard
├─ Plant addition rate
└─ Feature discovery (sections visited)

COMMUNITY:
├─ Posts created
├─ Comments per post
├─ Profile views
├─ Chat messages sent
└─ Followers gained

MARKETPLACE:
├─ Product views
├─ Add to cart
├─ Checkout completion
├─ Conversion rate
└─ Average order value
```

---

## 📝 NOTES FOR IMPLEMENTATION

1. **Authentication Context** is already integrated - use `useAuth()` hook
2. **Language Support** is available - use `useLanguage()` hook
3. **Navigation is Router-based** - use React Router v6
4. **Animations** use Framer Motion - maintain consistency
5. **UI Components** use shadcn/ui - follow existing patterns
6. **Toast notifications** use Sonner - already configured

---

**Created by:** Development Team  
**Last Updated:** January 30, 2026  
**Status:** Foundation Layer - Ready for Webflow & Hook Planning
