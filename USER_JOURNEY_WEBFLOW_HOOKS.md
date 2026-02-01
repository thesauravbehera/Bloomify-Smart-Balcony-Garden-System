# USER JOURNEY WEBFLOW & NAVIGATION HOOKS
**Version 1.0** | Detailed Flow Specifications

---

## TABLE OF CONTENTS
1. [Landing Page Webflow](#landing-page-webflow)
2. [Authentication Webflow](#authentication-webflow)
3. [Dashboard Webflow](#dashboard-webflow)
4. [Feature Webflows](#feature-webflows)
5. [Navigation Patterns](#navigation-patterns)
6. [State Management](#state-management)
7. [Hook Integration Points](#hook-integration-points)

---

## LANDING PAGE WEBFLOW

### Flow Diagram
```
┌─────────────────────────────────────────┐
│  User Lands on /                        │
│  (LandingPage Component)                │
└────────────┬────────────────────────────┘
             │
             ├─ Event: landing_page_view
             │
             ↓
┌─────────────────────────────────────────┐
│  Hero Section                           │
│  ├─ Event: hero_section_view            │
│  ├─ CTA: "Start Growing Free"           │
│  │  └─ Event: hero_cta_click            │
│  │     → Opens AuthModal                │
│  └─ CTA: "Watch Demo"                   │
│     └─ Event: hero_cta_click            │
│        → Opens Video Modal              │
└────────────┬────────────────────────────┘
             │
      [User Scrolls Down]
             │
             ↓
┌─────────────────────────────────────────┐
│  Features Section                       │
│  ├─ Event: features_section_view        │
│  ├─ Event: scroll_depth 25%             │
│  └─ Feature Cards                       │
│     └─ "Learn More" buttons             │
└────────────┬────────────────────────────┘
             │
      [User Scrolls Down]
             │
             ↓
┌─────────────────────────────────────────┐
│  Interactive Demo Section               │
│  ├─ Event: interactive_demo_view        │
│  ├─ Event: scroll_depth 50%             │
│  └─ 3D Model Interactions               │
└────────────┬────────────────────────────┘
             │
      [User Scrolls Down]
             │
             ↓
┌─────────────────────────────────────────┐
│  About Section                          │
│  ├─ Event: about_section_view           │
│  ├─ Event: scroll_depth 75%             │
│  └─ Company Story                       │
└────────────┬────────────────────────────┘
             │
      [User Scrolls Down]
             │
             ↓
┌─────────────────────────────────────────┐
│  Levels Section                         │
│  ├─ Event: levels_section_view          │
│  └─ Gamification Info                   │
└────────────┬────────────────────────────┘
             │
      [User Scrolls Down]
             │
             ↓
┌─────────────────────────────────────────┐
│  Testimonials Section                   │
│  ├─ Event: testimonials_view            │
│  └─ User Stories                        │
└────────────┬────────────────────────────┘
             │
      [User Scrolls Down]
             │
             ↓
┌─────────────────────────────────────────┐
│  CTA Section                            │
│  ├─ Event: cta_section_view             │
│  ├─ Event: scroll_depth 100%            │
│  ├─ "Start Growing Today" Button        │
│  │  └─ Event: cta_button_click          │
│  │     → Opens AuthModal                │
│  └─ "Join 10,000+ Gardeners"            │
└────────────┬────────────────────────────┘
             │
      [User Scrolls Down]
             │
             ↓
┌─────────────────────────────────────────┐
│  Footer                                 │
│  ├─ Links                               │
│  ├─ Social Links                        │
│  ├─ Newsletter Signup                   │
│  │  └─ Event: custom_event              │
│  │     {action: 'newsletter_signup'}    │
│  └─ Language Selector                   │
└─────────────────────────────────────────┘
```

### Implementation in LandingPage.tsx
```tsx
import { useJourney, useScrollDepth } from '../hooks/useJourneyTracking';

export function LandingPage() {
  const { trackEvent } = useJourney();

  // Track landing page view
  useEffect(() => {
    trackEvent({
      eventType: 'landing_page_view',
      metadata: { pageName: 'home' },
    });
  }, []);

  // Automatically tracks 25%, 50%, 75%, 100% scroll depth
  useScrollDepth();

  return (
    <main>
      <HeroSectionCosmic />      {/* Tracks hero_section_view */}
      <FeaturesSection />        {/* Tracks features_section_view */}
      <InteractiveDemoSection /> {/* Tracks interactive_demo_view */}
      <AboutSection />           {/* Tracks about_section_view */}
      <LevelsSection />          {/* Tracks levels_section_view */}
      <TestimonialsSection />    {/* Tracks testimonials_view */}
      <CTASection />             {/* Tracks cta_section_view */}
      <Footer />
    </main>
  );
}
```

---

## AUTHENTICATION WEBFLOW

### Sign-Up Flow
```
┌─────────────────────────────────────────┐
│  Auth Modal Opens (Tab: Sign Up)        │
│  └─ Event: auth_modal_open              │
└────────────┬────────────────────────────┘
             │
             ↓
┌─────────────────────────────────────────┐
│  User Enters Information                │
│  ├─ Full Name                           │
│  ├─ Email                               │
│  ├─ Password (with strength indicator)  │
│  └─ Confirm Password                    │
└────────────┬────────────────────────────┘
             │
             ↓
┌─────────────────────────────────────────┐
│  User Clicks "Create Account"           │
│  └─ Event: sign_up_start                │
└────────────┬────────────────────────────┘
             │
             ↓
         [API Call]
             │
    ┌────────┴────────┐
    ↓                 ↓
[Success]         [Error]
    │                 │
    │                 ├─ Event: auth_error
    │                 │
    │                 └─ Show error toast
    │                    (user can retry)
    │
    ↓
┌─────────────────────────────────────────┐
│  Event: sign_up_complete                │
│  ├─ userId logged                       │
│  └─ Redirect to /dashboard              │
└─────────────────────────────────────────┘
```

### Login Flow
```
┌─────────────────────────────────────────┐
│  Auth Modal Opens (Tab: Login)          │
│  └─ Event: auth_modal_open              │
└────────────┬────────────────────────────┘
             │
             ↓
┌─────────────────────────────────────────┐
│  User Enters Credentials                │
│  ├─ Email                               │
│  └─ Password                            │
│                                         │
│  Optional: "Forgot Password?"           │
│  └─ Event: custom_event                 │
│     {action: 'password_reset_click'}    │
└────────────┬────────────────────────────┘
             │
             ↓
┌─────────────────────────────────────────┐
│  User Clicks "Login"                    │
│  └─ Event: login_start                  │
└────────────┬────────────────────────────┘
             │
             ↓
         [API Call]
             │
    ┌────────┴────────┐
    ↓                 ↓
[Success]         [Error]
    │                 │
    │                 ├─ Event: auth_error
    │                 │
    │                 └─ Show error toast
    │
    ↓
┌─────────────────────────────────────────┐
│  Event: login_complete                  │
│  ├─ userId logged                       │
│  └─ Redirect to /dashboard              │
└─────────────────────────────────────────┘
```

### Implementation in AuthModal.tsx
```tsx
import { useAuthTracking } from '../hooks/useJourneyTracking';

export function AuthModal({ isOpen, onClose }) {
  const authTracking = useAuthTracking();

  // Track modal open
  useEffect(() => {
    if (isOpen) {
      trackEvent({
        eventType: 'auth_modal_open',
        metadata: { initialTab: activeTab },
      });
    }
  }, [isOpen, activeTab]);

  // Track sign up
  const handleSignup = async () => {
    authTracking.trackSignUpStart();
    try {
      const user = await registerUser(signupForm);
      authTracking.trackSignUpComplete(user.uid);
      navigate('/dashboard');
    } catch (error) {
      authTracking.trackAuthError(error.message);
    }
  };

  // Track login
  const handleLogin = async () => {
    authTracking.trackLoginStart();
    try {
      const user = await loginUser(loginForm);
      authTracking.trackLoginComplete(user.uid);
      navigate('/dashboard');
    } catch (error) {
      authTracking.trackAuthError(error.message);
    }
  };
}
```

---

## DASHBOARD WEBFLOW

### Dashboard Entry & Overview
```
┌─────────────────────────────────────────┐
│  User Navigates to /dashboard           │
│  (Protected Route - Auth Required)      │
└────────────┬────────────────────────────┘
             │
      [Auth Check]
             │
    ┌────────┴────────┐
    ↓                 ↓
[Logged In]       [Not Logged In]
    │                 │
    │                 └─ Redirect to /
    │                    Event: protected_route_attempt
    │
    ↓
┌─────────────────────────────────────────┐
│  Dashboard Loads                        │
│  └─ Event: dashboard_view               │
│     {userId, userName}                  │
└────────────┬────────────────────────────┘
             │
             ├─ Welcome Header
             ├─ Stats Cards (Read-only)
             └─ Quick Actions Panel
                 ├─ View Calendar
                 ├─ Browse Community
                 └─ Visit Marketplace
```

### My Plants Section
```
┌─────────────────────────────────────────┐
│  My Plants Grid                         │
│  (Each plant card shows)                │
│  ├─ 3D Model                            │
│  ├─ Health %                            │
│  ├─ Water status                        │
│  └─ Last care time                      │
└────────────┬────────────────────────────┘
             │
      [User Clicks Plant Card]
             │
             ├─ Event: plant_view
             │  {plantId, plantName}
             │
             ↓
┌─────────────────────────────────────────┐
│  Plant Detail Modal Opens               │
│  ├─ Full 3D Model Viewer                │
│  ├─ Plant Info                          │
│  ├─ Care History Timeline               │
│  └─ Action Buttons:                     │
│     ├─ Water Plant                      │
│     │  └─ Event: plant_water_click      │
│     ├─ Fertilize                        │
│     │  └─ Event: plant_fertilize_click  │
│     ├─ Health Check                     │
│     │  └─ Event: plant_health_check_click
│     └─ Remove Plant                     │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  Add New Plant Button                   │
│  └─ Event: plant_add_click              │
└────────────┬────────────────────────────┘
             │
             ↓
┌─────────────────────────────────────────┐
│  Plant Selection Modal                  │
│  ├─ Browse Plant Database               │
│  ├─ AI Recommendations                  │
│  └─ Select & Add                        │
└─────────────────────────────────────────┘
```

### Daily Tasks Section
```
┌─────────────────────────────────────────┐
│  Today's Tasks                          │
│  └─ Event: task_list_view               │
└────────────┬────────────────────────────┘
             │
      [User Views Tasks]
             │
┌────────────┴────────────────────────────┐
│  For Each Task:                         │
│  ├─ [Checkbox] Task Title [XP Reward]   │
│  │
│  └─ User Clicks Checkbox                │
│     ├─ Event: task_complete             │
│     │  {taskId, xpReward}               │
│     │
│     ├─ Task marked complete             │
│     ├─ XP notification shown            │
│     ├─ Streak counter updated           │
│     └─ Achievement check                │
│        (If unlocked)                    │
│        └─ Event: achievement_unlock     │
│           └─ Event: xp_earned           │
└─────────────────────────────────────────┘
```

### Calendar & Activity
```
┌─────────────────────────────────────────┐
│  Calendar View                          │
│  └─ Event: calendar_view                │
│     (On tab click or page load)         │
├─────────────────────────────────────────┤
│  Color-coded care events:               │
│  ├─ Green: Watering day                 │
│  ├─ Blue: Fertilizing                   │
│  ├─ Yellow: Health check                │
│  └─ Red: Alert/Issue                    │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  Activity Feed                          │
│  └─ Event: activity_feed_view           │
│     (On tab click or page load)         │
├─────────────────────────────────────────┤
│  Recent Activities:                     │
│  ├─ PROTOCOL INITIATED: Tulsi Unit 01  │
│  ├─ NUTRIENT SYNC: Snake Plant Alpha   │
│  └─ ... (click to expand)               │
└─────────────────────────────────────────┘
```

### Implementation in Dashboard.tsx
```tsx
import { useJourney, usePlantTracking } from '../hooks/useJourneyTracking';

export function Dashboard() {
  const { trackEvent } = useJourney();
  const { trackWaterClick, trackFertilizeClick, trackHealthCheck } = usePlantTracking();

  useEffect(() => {
    trackEvent({
      eventType: 'dashboard_view',
      metadata: {
        userId: currentUser?.uid,
        userName: currentUser?.displayName,
      },
    });
  }, []);

  const handleWaterPlant = (plantId) => {
    trackWaterClick(plantId);
    // Water logic
  };

  const handleTaskComplete = (taskId) => {
    trackEvent({
      eventType: 'task_complete',
      metadata: { taskId },
    });
    // Task complete logic
  };

  return (
    <div>
      {/* Plant Cards */}
      {plants.map(plant => (
        <PlantCard 
          key={plant.id}
          plant={plant}
          onWater={() => trackWaterClick(plant.id)}
          onFertilize={() => trackFertilizeClick(plant.id)}
          onHealthCheck={() => trackHealthCheck(plant.id)}
        />
      ))}

      {/* Tasks */}
      {todayTasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onComplete={() => handleTaskComplete(task.id)}
        />
      ))}
    </div>
  );
}
```

---

## FEATURE WEBFLOWS

### Gamification Hub Webflow
```
┌─────────────────────────────────────────┐
│  User Navigates to /garden              │
│  (Protected Route)                      │
└────────────┬────────────────────────────┘
             │
             ├─ Event: garden_page_view
             │
             ↓
┌─────────────────────────────────────────┐
│  Gamification Hub Tabs                  │
│  ├─ Levels Tab (Active)                 │
│  │  └─ Event: levels_tab_view           │
│  │     - Current level display          │
│  │     - XP progress bar                │
│  │     - Level requirements             │
│  │                                      │
│  ├─ Achievements Tab                    │
│  │  └─ Event: achievements_tab_view     │
│  │     - Achievement grid               │
│  │     - Progress indicators            │
│  │                                      │
│  ├─ Challenges Tab                      │
│  │  └─ Event: challenges_tab_view       │
│  │     - Weekly challenges              │
│  │     - Monthly challenges             │
│  │     └─ Click "Join Challenge"        │
│  │        ├─ Event: challenge_join      │
│  │        │  {challengeId, challengeName}
│  │        └─ Progress tracking          │
│  │           └─ Challenge complete      │
│  │              ├─ Event: challenge_complete
│  │              └─ Event: xp_earned     │
│  │                                      │
│  └─ Leaderboard Tab                     │
│     └─ Event: leaderboard_tab_view      │
│        - Global rankings                │
│        - Friends rankings               │
│        - Click user → Profile view      │
└─────────────────────────────────────────┘
```

### Community Hub Webflow
```
┌─────────────────────────────────────────┐
│  User Navigates to /community           │
│  (Public, no auth required)             │
└────────────┬────────────────────────────┘
             │
             ├─ Event: community_page_view
             │
             ↓
┌─────────────────────────────────────────┐
│  Community Sections                     │
│                                         │
│  1. Feed/Posts Section                  │
│     ├─ Event: post_view (on scroll)     │
│     ├─ Like Button                      │
│     │  └─ Event: post_like              │
│     ├─ Comment Button                   │
│     │  └─ Event: post_comment           │
│     └─ Share Button                     │
│        └─ Event: custom_event           │
│                                         │
│  2. User Profiles                       │
│     ├─ Click Profile                    │
│     │  └─ Event: user_profile_view      │
│     │     {userId}                      │
│     └─ Follow Button                    │
│        └─ Event: follow_user            │
│           {userId}                      │
│                                         │
│  3. Featured Gardens                    │
│     ├─ Event: garden_showcase_view      │
│     └─ Full 3D tour & details           │
│                                         │
│  4. Chat Channels                       │
│     ├─ Click Channel                    │
│     ├─ Read Messages                    │
│     └─ Send Message                     │
│        └─ Event: chat_message_send      │
└─────────────────────────────────────────┘
```

### Marketplace Webflow
```
┌─────────────────────────────────────────┐
│  User Navigates to /marketplace         │
│  (Public, no auth required)             │
└────────────┬────────────────────────────┘
             │
             ├─ Event: marketplace_page_view
             │
             ↓
┌─────────────────────────────────────────┐
│  Browse Products                        │
│  ├─ Search Bar                          │
│  │  └─ Event: product_search            │
│  │     {query, resultCount}             │
│  │                                      │
│  ├─ Filter Sidebar                      │
│  │  └─ Event: product_filter_apply      │
│  │     {filterType, filterValue}        │
│  │                                      │
│  └─ Product Grid                        │
│     └─ Hover Product Card               │
│        └─ Event: product_view           │
│           {productId, productName}      │
│                                         │
│        Click Product Card               │
│        └─ Detailed View Opens           │
└────────────┬────────────────────────────┘
             │
             ↓
┌─────────────────────────────────────────┐
│  Product Details View                   │
│  ├─ Image Gallery                       │
│  ├─ Reviews & Ratings                   │
│  ├─ Recommendations                     │
│  └─ Add to Cart Button                  │
│     ├─ Event: product_add_to_cart       │
│     │  {productId, quantity}            │
│     │                                   │
│     └─ (If logged in)                   │
│        Continue Shopping or             │
│        View Cart                        │
│        └─ Event: cart_view              │
└────────────┬────────────────────────────┘
             │
    (Optional if logged in)
             │
             ↓
┌─────────────────────────────────────────┐
│  Checkout Process                       │
│  ├─ Event: checkout_start               │
│  │                                      │
│  ├─ Enter Address                       │
│  ├─ Select Payment Method               │
│  ├─ Review Order                        │
│  │                                      │
│  └─ Place Order Button                  │
│     └─ Event: checkout_complete         │
│        {orderId, total}                 │
│                                         │
│        Order Confirmation Page          │
└─────────────────────────────────────────┘
```

### AR Scanner Webflow
```
┌─────────────────────────────────────────┐
│  User Navigates to /scanner             │
│  (Protected Route)                      │
└────────────┬────────────────────────────┘
             │
             ├─ Event: scanner_page_view
             │
             ↓
┌─────────────────────────────────────────┐
│  Request Camera Access                  │
│  ├─ Browser Permission Dialog           │
│  └─ User Grants/Denies Permission       │
│     ├─ Event: camera_permission_granted
│     │  └─ Continue to scanning          │
│     │                                   │
│     └─ Event: camera_permission_denied  │
│        └─ Show fallback UI              │
│           (Manual measurement form)     │
└────────────┬────────────────────────────┘
             │
      [Camera Granted]
             │
             ↓
┌─────────────────────────────────────────┐
│  Live Camera Feed                       │
│  ├─ AR Overlay Grid                     │
│  ├─ Scan Button (Center)                │
│  └─ Back Button                         │
└────────────┬────────────────────────────┘
             │
      [User Points at Balcony]
             │
             ↓
┌─────────────────────────────────────────┐
│  User Clicks Scan Button                │
│  └─ Event: scan_start                   │
└────────────┬────────────────────────────┘
             │
      [Processing Animation]
             │
    ┌────────┴────────┐
    ↓                 ↓
[Success]         [Error]
    │                 │
    │                 └─ Event: scan_error
    │                    {errorType}
    │                    └─ Show error UI
    │
    ↓
┌─────────────────────────────────────────┐
│  Event: scan_complete                   │
│  {dimensions, sunlight, spaceAvailable} │
└────────────┬────────────────────────────┘
             │
             ↓
┌─────────────────────────────────────────┐
│  Results Page                           │
│  ├─ Balcony Dimensions                  │
│  ├─ Sunlight Analysis                   │
│  ├─ Recommended Plants                  │
│  ├─ Layout Suggestions                  │
│  │                                      │
│  ├─ "Save Scan" Button                  │
│  ├─ "Share with Community" Button       │
│  ├─ "Add Plants to Garden" Button       │
│  │  └─ Event: plant_add_click           │
│  └─ "Dismiss" Button                    │
└─────────────────────────────────────────┘
```

---

## NAVIGATION PATTERNS

### Protected Route Navigation
```tsx
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { useJourney } from '../hooks/useJourneyTracking';

// Wrapper for protected routes
export function ProtectedRoute({ children }) {
  const { userLoggedIn } = useAuth();
  const { trackEvent } = useJourney();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLoggedIn) {
      trackEvent({
        eventType: 'protected_route_attempt',
        metadata: {
          route: location.pathname,
          timestamp: Date.now(),
        },
      });
      navigate('/');
    }
  }, [userLoggedIn]);

  return userLoggedIn ? children : null;
}
```

### Navigation Click Tracking
```tsx
import { Link, useNavigate } from 'react-router';
import { useJourney } from '../hooks/useJourneyTracking';

export function Navigation() {
  const { trackEvent } = useJourney();
  const navigate = useNavigate();

  const handleNavigate = (href, label) => {
    trackEvent({
      eventType: 'navigation_click',
      metadata: {
        destination: href,
        label: label,
        from: location.pathname,
      },
    });
    navigate(href);
  };

  return (
    <nav>
      <button onClick={() => handleNavigate('/', 'home')}>
        Home
      </button>
      <button onClick={() => handleNavigate('/dashboard', 'dashboard')}>
        Dashboard
      </button>
      {/* ... more nav items */}
    </nav>
  );
}
```

### Back Button Navigation
```tsx
import { useNavigate } from 'react-router';
import { useJourney } from '../hooks/useJourneyTracking';

export function BackButton() {
  const navigate = useNavigate();
  const { trackEvent } = useJourney();

  const handleBack = () => {
    trackEvent({
      eventType: 'back_button_click',
      metadata: {
        from: location.pathname,
      },
    });
    navigate(-1);
  };

  return <button onClick={handleBack}>← Back</button>;
}
```

---

## STATE MANAGEMENT

### Journey State Structure
```tsx
{
  currentSession: {
    sessionId: 'session_1706700000000_xyz',
    userId: 'user123',
    startTime: 1706700000000,
    endTime: null,
    events: [...],
    entryPoint: '/',
    exitPoint: null,
    duration: null,
    deviceInfo: {
      userAgent: '...',
      platform: 'Windows',
      viewport: { width: 1920, height: 1080 }
    }
  },
  currentPage: '/dashboard',
  previousPage: '/',
  isLoading: false,
  error: null,
  events: [...],
  sessionMetrics: {
    totalEvents: 25,
    lastEventTime: 1706700060000,
    activeTime: 45000
  }
}
```

### Context Methods
```tsx
interface IJourneyContext {
  state: JourneyState;
  trackEvent: (event: JourneyEvent) => void;
  startSession: (entryPoint: string, userId?: string) => void;
  endSession: () => void;
  navigateTo: (route: string) => void;
  getSessionMetrics: () => JourneyMetrics;
  clearEvents: () => void;
}
```

---

## HOOK INTEGRATION POINTS

### Per Component

| Component | Recommended Hooks | Events to Track |
|-----------|------------------|-----------------|
| **LandingPage** | `useJourney`, `useScrollDepth` | `landing_page_view`, scroll events |
| **HeroSection** | `useJourney`, `useTrackClick` | `hero_section_view`, `hero_cta_click` |
| **FeaturesSection** | `useJourney`, `useSectionView` | `features_section_view` |
| **Dashboard** | `useJourney`, `usePlantTracking` | `dashboard_view`, plant events |
| **AuthModal** | `useAuthTracking` | Auth events |
| **GamificationHub** | `useGamificationTracking` | Achievement, challenge, XP events |
| **CommunityHub** | `useCommunityTracking` | Post, profile, follow events |
| **Marketplace** | `useMarketplaceTracking` | Product, cart, checkout events |
| **ARBalconyScanner** | `useJourney` | Scanner-specific events |
| **Navigation** | `useJourney` | `navigation_click` |

---

**Status:** Ready for Component Integration  
**Next:** Add hooks to all remaining components
