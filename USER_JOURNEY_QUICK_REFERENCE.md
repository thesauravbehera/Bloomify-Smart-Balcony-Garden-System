# USER JOURNEY TRACKING - QUICK REFERENCE
**Copy & Paste Integration Guide**

---

## 1️⃣ IMPORT STATEMENTS

### For Basic Journey Tracking
```tsx
import { useJourney, useTrackClick } from '../hooks/useJourneyTracking';
```

### For Specific Feature Tracking
```tsx
import { useAuthTracking } from '../hooks/useJourneyTracking';
import { usePlantTracking } from '../hooks/useJourneyTracking';
import { useGamificationTracking } from '../hooks/useJourneyTracking';
import { useCommunityTracking } from '../hooks/useJourneyTracking';
import { useMarketplaceTracking } from '../hooks/useJourneyTracking';
```

---

## 2️⃣ COMPONENT SETUP PATTERNS

### Pattern A: Page View Tracking
```tsx
import { useEffect } from 'react';
import { useJourney } from '../hooks/useJourneyTracking';

export function MyPage() {
  const { trackEvent } = useJourney();

  useEffect(() => {
    trackEvent({
      eventType: 'dashboard_view',
      metadata: {
        pageName: 'dashboard',
      },
    });
  }, [trackEvent]);

  return <div>Page Content</div>;
}
```

### Pattern B: Button Click Tracking
```tsx
import { useTrackClick } from '../hooks/useJourneyTracking';

export function MyButton() {
  const handleClick = useTrackClick('hero_cta_click', { 
    cta: 'start_growing' 
  });

  return <button onClick={handleClick}>Click Me</button>;
}
```

### Pattern C: Event Handler Tracking
```tsx
import { useJourney } from '../hooks/useJourneyTracking';

export function MyComponent() {
  const { trackEvent } = useJourney();

  const handleAction = async () => {
    trackEvent({
      eventType: 'custom_event',
      metadata: { action: 'my_action' },
    });

    // Do something
  };

  return <button onClick={handleAction}>Action</button>;
}
```

### Pattern D: Feature-Specific Tracking
```tsx
import { usePlantTracking } from '../hooks/useJourneyTracking';

export function PlantCard({ plantId }) {
  const { trackWaterClick } = usePlantTracking();

  return (
    <button onClick={() => trackWaterClick(plantId)}>
      Water
    </button>
  );
}
```

---

## 3️⃣ COMMON USE CASES

### Track Section View on Scroll
```tsx
import { useEffect } from 'react';
import { useJourney } from '../hooks/useJourneyTracking';

export function FeaturesSection() {
  const { trackEvent } = useJourney();
  const tracked = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('features');
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= window.innerHeight && !tracked.current) {
          trackEvent({
            eventType: 'features_section_view',
          });
          tracked.current = true;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [trackEvent]);

  return <section id="features">...</section>;
}
```

### Track Form Submission
```tsx
import { useJourney } from '../hooks/useJourneyTracking';

export function MyForm() {
  const { trackEvent } = useJourney();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    trackEvent({
      eventType: 'custom_event',
      metadata: { 
        action: 'form_submit',
        formName: 'contact_form'
      },
    });

    // Submit logic
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

### Track Modal Operations
```tsx
import { useJourney } from '../hooks/useJourneyTracking';

export function MyModal({ isOpen, onClose }) {
  const { trackEvent } = useJourney();

  useEffect(() => {
    if (isOpen) {
      trackEvent({
        eventType: 'custom_event',
        metadata: { action: 'modal_open', modalName: 'my_modal' },
      });
    }
  }, [isOpen, trackEvent]);

  return isOpen && <div>Modal Content</div>;
}
```

### Track Error Occurrences
```tsx
import { useJourney } from '../hooks/useJourneyTracking';

export function RiskyOperation() {
  const { trackEvent } = useJourney();

  const doSomething = async () => {
    try {
      // Operation
    } catch (error) {
      trackEvent({
        eventType: 'error',
        metadata: { 
          errorType: 'operation_failed',
          errorMessage: error.message
        },
        error: error.message,
      });
    }
  };

  return <button onClick={doSomething}>Try</button>;
}
```

---

## 4️⃣ AUTH TRACKING EXAMPLES

### Sign Up
```tsx
import { useAuthTracking } from '../hooks/useJourneyTracking';

export function SignupForm() {
  const { trackSignUpStart, trackSignUpComplete, trackAuthError } = useAuthTracking();

  const handleSignup = async () => {
    trackSignUpStart();
    try {
      const user = await signup(email, password);
      trackSignUpComplete(user.id);
    } catch (error) {
      trackAuthError(error.message);
    }
  };

  return <button onClick={handleSignup}>Sign Up</button>;
}
```

### Login
```tsx
import { useAuthTracking } from '../hooks/useJourneyTracking';

export function LoginForm() {
  const { trackLoginStart, trackLoginComplete, trackAuthError } = useAuthTracking();

  const handleLogin = async () => {
    trackLoginStart();
    try {
      const user = await login(email, password);
      trackLoginComplete(user.id);
    } catch (error) {
      trackAuthError(error.message);
    }
  };

  return <button onClick={handleLogin}>Login</button>;
}
```

---

## 5️⃣ PLANT TRACKING EXAMPLES

### Water Plant
```tsx
import { usePlantTracking } from '../hooks/useJourneyTracking';

export function PlantActions({ plantId }) {
  const { trackWaterClick } = usePlantTracking();

  return (
    <button onClick={() => trackWaterClick(plantId)}>
      Water Plant
    </button>
  );
}
```

### Complete Plant Action
```tsx
import { usePlantTracking } from '../hooks/useJourneyTracking';

export function PlantCard({ plant }) {
  const { 
    trackPlantView,
    trackWaterClick,
    trackFertilizeClick,
    trackHealthCheck,
  } = usePlantTracking();

  useEffect(() => {
    trackPlantView(plant.id, plant.name);
  }, [plant.id]);

  return (
    <div>
      <h3>{plant.name}</h3>
      <button onClick={() => trackWaterClick(plant.id)}>Water</button>
      <button onClick={() => trackFertilizeClick(plant.id)}>Fertilize</button>
      <button onClick={() => trackHealthCheck(plant.id)}>Health Check</button>
    </div>
  );
}
```

---

## 6️⃣ GAMIFICATION TRACKING EXAMPLES

### Achievement Unlock
```tsx
import { useGamificationTracking } from '../hooks/useJourneyTracking';

export function AchievementNotification({ achievement }) {
  const { trackAchievementUnlock } = useGamificationTracking();

  useEffect(() => {
    trackAchievementUnlock(achievement.id, achievement.name);
  }, [achievement.id]);

  return <div>Achievement Unlocked!</div>;
}
```

### Complete Gamification Tracking
```tsx
import { useGamificationTracking } from '../hooks/useJourneyTracking';

export function GamificationHub() {
  const {
    trackAchievementUnlock,
    trackXpEarned,
    trackChallengeJoin,
    trackChallengeComplete,
  } = useGamificationTracking();

  const joinChallenge = (id, name) => {
    trackChallengeJoin(id, name);
  };

  const completeChallenge = (id, name) => {
    trackChallengeComplete(id, name);
    trackXpEarned(500, 'challenge_complete');
  };

  return <div>Gamification Hub</div>;
}
```

---

## 7️⃣ COMMUNITY TRACKING EXAMPLES

### Post Creation
```tsx
import { useCommunityTracking } from '../hooks/useJourneyTracking';

export function CreatePost() {
  const { trackPostCreate } = useCommunityTracking();

  const handleSubmit = (content) => {
    const postId = createPost(content);
    trackPostCreate(postId);
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

### Post Engagement
```tsx
import { useCommunityTracking } from '../hooks/useJourneyTracking';

export function PostCard({ post }) {
  const { 
    trackPostLike,
    trackPostComment,
    trackUserProfileView,
  } = useCommunityTracking();

  return (
    <div>
      <div onClick={() => trackUserProfileView(post.authorId)}>
        {post.author}
      </div>
      <button onClick={() => trackPostLike(post.id)}>Like</button>
      <button onClick={() => trackPostComment(post.id)}>Comment</button>
    </div>
  );
}
```

---

## 8️⃣ MARKETPLACE TRACKING EXAMPLES

### Product View & Add to Cart
```tsx
import { useMarketplaceTracking } from '../hooks/useJourneyTracking';

export function ProductCard({ product }) {
  const { 
    trackProductView,
    trackAddToCart,
  } = useMarketplaceTracking();

  useEffect(() => {
    trackProductView(product.id, product.name);
  }, [product.id]);

  const handleAddToCart = () => {
    trackAddToCart(product.id, quantity);
    // Add to cart logic
  };

  return (
    <div>
      <h3>{product.name}</h3>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}
```

### Checkout Tracking
```tsx
import { useMarketplaceTracking } from '../hooks/useJourneyTracking';

export function CheckoutPage() {
  const { 
    trackCheckoutStart,
    trackCheckoutComplete,
  } = useMarketplaceTracking();

  useEffect(() => {
    trackCheckoutStart();
  }, []);

  const handlePurchase = async () => {
    const order = await processPurchase();
    trackCheckoutComplete(order.id, order.total);
  };

  return <button onClick={handlePurchase}>Purchase</button>;
}
```

---

## 9️⃣ GET METRICS

### Get Session Metrics
```tsx
import { useJourneyMetrics } from '../hooks/useJourneyTracking';

export function AnalyticsDashboard() {
  const metrics = useJourneyMetrics();

  return (
    <div>
      <p>Sign Ups: {metrics.signUpCompleted}</p>
      <p>CTAs Clicked: {metrics.ctaClicks}</p>
      <p>Scroll Depth: {JSON.stringify(metrics.scrollDepth)}</p>
    </div>
  );
}
```

### In Dev Tools
```jsx
// In browser console:
import { getAnalyticsService } from './services/analyticsService';
const analytics = getAnalyticsService();
console.log(analytics.getAnalyticsSummary());
```

---

## 🔟 EVENT METADATA TIPS

### What to Include
```tsx
trackEvent({
  eventType: 'custom_event',
  metadata: {
    // Always include contextual data
    userId: user?.id,           // Who did it
    action: 'button_clicked',   // What they did
    source: 'hero',             // Where they did it
    timestamp: Date.now(),      // When they did it
    additionalData: {...},      // Any relevant context
  },
});
```

### What to Avoid
```tsx
// ❌ Don't include sensitive data
metadata: {
  password: 'secret',           // NEVER
  creditCard: '1234-...',       // NEVER
  personalInfo: {...},          // AVOID
}

// ❌ Don't include large objects
metadata: {
  entireUserObject: user,       // Extract needed fields instead
  largeArray: [1000 items],     // Summarize instead
}

// ✅ Do summarize
metadata: {
  arraySize: 1000,              // Good
  userId: user.id,              // Good
  userName: user.name,          // Good
}
```

---

## 🎯 TESTING

### Manual Testing
```tsx
// 1. Open browser console
// 2. Trigger action in UI
// 3. Check console for "[Journey Event]" logs
// 4. Verify metadata is correct
```

### Check Queue Status
```tsx
// In browser console:
import { getAnalyticsService } from './services/analyticsService';
const analytics = getAnalyticsService();
const summary = analytics.getAnalyticsSummary();
console.table(summary.eventCounts);
```

### Force Flush Events
```tsx
// In browser console:
import { getAnalyticsService } from './services/analyticsService';
const analytics = getAnalyticsService();
await analytics.flushEvents();
```

---

## 🚨 TROUBLESHOOTING

### Events not being tracked
```tsx
// Check if UserJourneyProvider is wrapping the app
// In App.tsx:
<UserJourneyProvider>
  <Router>
    {/* Your routes */}
  </Router>
</UserJourneyProvider>
```

### Events in console but not in queue
```tsx
// Check if tracking hook is being used correctly
const { trackEvent } = useJourney(); // ✅ Call hook
trackEvent({...});                    // ✅ Call function

// NOT:
const { trackEvent } = useJourney;    // ❌ Forgot ()
```

### API 404 errors
```tsx
// Check environment variable
console.log(import.meta.env.VITE_ANALYTICS_API);

// Or provide default in initializeAnalytics
initializeAnalytics({
  apiEndpoint: 'http://localhost:3000/api/analytics',
});
```

---

**Last Updated:** January 30, 2026  
**Status:** Ready to Use
