/**
 * Custom Hooks for User Journey Tracking
 * Provides easy access to journey tracking functionality
 */

import { useContext, useCallback, useEffect } from 'react';
import { UserJourneyContext } from '../contexts/UserJourneyContext';
import { JourneyEventType } from '../types/journey';

/**
 * Hook to access the journey context
 */
export function useJourney() {
  const context = useContext(UserJourneyContext);
  if (!context) {
    throw new Error('useJourney must be used within UserJourneyProvider');
  }
  return context;
}

/**
 * Hook to track a page/section view
 */
export function usePageView(pageName: string) {
  const { trackEvent } = useJourney();

  useEffect(() => {
    trackEvent({
      eventType: 'landing_page_view',
      metadata: {
        pageName,
      },
    });
  }, [pageName, trackEvent]);
}

/**
 * Hook to track section scrolling
 */
export function useSectionView(sectionName: string) {
  const { trackEvent } = useJourney();

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById(sectionName);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          trackEvent({
            eventType: `${sectionName}_view` as JourneyEventType,
            metadata: {
              sectionName,
              scrollPosition: window.scrollY,
            },
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { once: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionName, trackEvent]);
}

/**
 * Hook to track button clicks with context
 */
export function useTrackClick(eventType: JourneyEventType, metadata?: Record<string, any>) {
  const { trackEvent } = useJourney();

  return useCallback(() => {
    trackEvent({
      eventType,
      metadata,
    });
  }, [eventType, metadata, trackEvent]);
}

/**
 * Hook to track element interaction time
 */
export function useInteractionTimer(elementId: string, eventName: JourneyEventType) {
  const { trackEvent } = useJourney();

  useEffect(() => {
    let startTime: number;
    let isActive = false;

    const element = document.getElementById(elementId);
    if (!element) return;

    const handleMouseEnter = () => {
      startTime = Date.now();
      isActive = true;
    };

    const handleMouseLeave = () => {
      if (isActive) {
        const duration = Date.now() - startTime;
        trackEvent({
          eventType: eventName,
          metadata: {
            elementId,
            duration,
          },
          duration,
        });
        isActive = false;
      }
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [elementId, eventName, trackEvent]);
}

/**
 * Hook to track form submission
 */
export function useFormTracking(formId: string, formName: string) {
  const { trackEvent } = useJourney();

  useEffect(() => {
    const form = document.getElementById(formId);
    if (!form) return;

    const handleSubmit = () => {
      trackEvent({
        eventType: 'custom_event',
        metadata: {
          action: `${formName}_submit`,
          formId,
        },
      });
    };

    form.addEventListener('submit', handleSubmit);
    return () => form.removeEventListener('submit', handleSubmit);
  }, [formId, formName, trackEvent]);
}

/**
 * Hook to track scroll depth percentage
 */
export function useScrollDepth() {
  const { trackEvent } = useJourney();

  useEffect(() => {
    const depthsTracked = new Set<number>();

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const scrollPercent = Math.round((scrolled / scrollHeight) * 100);

      const milestones = [25, 50, 75, 100];
      milestones.forEach((milestone) => {
        if (scrollPercent >= milestone && !depthsTracked.has(milestone)) {
          depthsTracked.add(milestone);
          trackEvent({
            eventType: 'custom_event',
            metadata: {
              action: 'scroll_depth',
              depth: milestone,
            },
          });
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [trackEvent]);
}

/**
 * Hook to track custom events with context
 */
export function useCustomEvent(eventType: JourneyEventType) {
  const { trackEvent } = useJourney();

  return useCallback(
    (metadata?: Record<string, any>) => {
      trackEvent({
        eventType,
        metadata,
      });
    },
    [eventType, trackEvent]
  );
}

/**
 * Hook to track time spent on page
 */
export function useTimeOnPage() {
  const { trackEvent } = useJourney();
  const startTimeRef = React.useRef<number>(Date.now());

  useEffect(() => {
    return () => {
      const timeSpent = Date.now() - startTimeRef.current;
      trackEvent({
        eventType: 'custom_event',
        metadata: {
          action: 'time_on_page',
          timeSpent,
        },
        duration: timeSpent,
      });
    };
  }, [trackEvent]);
}

/**
 * Hook to get journey metrics
 */
export function useJourneyMetrics() {
  const { getSessionMetrics } = useJourney();
  return getSessionMetrics();
}

/**
 * Hook to track authentication flow
 */
export function useAuthTracking() {
  const { trackEvent } = useJourney();

  return {
    trackSignUpStart: useCallback(() => {
      trackEvent({
        eventType: 'sign_up_start',
        metadata: { timestamp: Date.now() },
      });
    }, [trackEvent]),

    trackSignUpComplete: useCallback((userId: string) => {
      trackEvent({
        eventType: 'sign_up_complete',
        metadata: { userId, timestamp: Date.now() },
      });
    }, [trackEvent]),

    trackLoginStart: useCallback(() => {
      trackEvent({
        eventType: 'login_start',
        metadata: { timestamp: Date.now() },
      });
    }, [trackEvent]),

    trackLoginComplete: useCallback((userId: string) => {
      trackEvent({
        eventType: 'login_complete',
        metadata: { userId, timestamp: Date.now() },
      });
    }, [trackEvent]),

    trackLogout: useCallback(() => {
      trackEvent({
        eventType: 'logout_complete',
        metadata: { timestamp: Date.now() },
      });
    }, [trackEvent]),

    trackAuthError: useCallback((error: string) => {
      trackEvent({
        eventType: 'auth_error',
        metadata: { error, timestamp: Date.now() },
        error,
      });
    }, [trackEvent]),
  };
}

/**
 * Hook to track plant-related actions
 */
export function usePlantTracking() {
  const { trackEvent } = useJourney();

  return {
    trackPlantView: useCallback((plantId: string, plantName: string) => {
      trackEvent({
        eventType: 'plant_view',
        metadata: { plantId, plantName },
      });
    }, [trackEvent]),

    trackPlantAdd: useCallback((plantSpecies: string) => {
      trackEvent({
        eventType: 'plant_add_click',
        metadata: { plantSpecies },
      });
    }, [trackEvent]),

    trackWaterClick: useCallback((plantId: string) => {
      trackEvent({
        eventType: 'plant_water_click',
        metadata: { plantId, timestamp: Date.now() },
      });
    }, [trackEvent]),

    trackFertilizeClick: useCallback((plantId: string) => {
      trackEvent({
        eventType: 'plant_fertilize_click',
        metadata: { plantId, timestamp: Date.now() },
      });
    }, [trackEvent]),

    trackHealthCheck: useCallback((plantId: string) => {
      trackEvent({
        eventType: 'plant_health_check_click',
        metadata: { plantId, timestamp: Date.now() },
      });
    }, [trackEvent]),
  };
}

/**
 * Hook to track gamification events
 */
export function useGamificationTracking() {
  const { trackEvent } = useJourney();

  return {
    trackAchievementUnlock: useCallback((achievementId: string, achievementName: string) => {
      trackEvent({
        eventType: 'achievement_unlock',
        metadata: { achievementId, achievementName, timestamp: Date.now() },
      });
    }, [trackEvent]),

    trackXpEarned: useCallback((amount: number, source: string) => {
      trackEvent({
        eventType: 'xp_earned',
        metadata: { xp: amount, source, timestamp: Date.now() },
      });
    }, [trackEvent]),

    trackChallengeJoin: useCallback((challengeId: string, challengeName: string) => {
      trackEvent({
        eventType: 'challenge_join',
        metadata: { challengeId, challengeName, timestamp: Date.now() },
      });
    }, [trackEvent]),

    trackChallengeComplete: useCallback((challengeId: string, challengeName: string) => {
      trackEvent({
        eventType: 'challenge_complete',
        metadata: { challengeId, challengeName, timestamp: Date.now() },
      });
    }, [trackEvent]),
  };
}

/**
 * Hook to track community events
 */
export function useCommunityTracking() {
  const { trackEvent } = useJourney();

  return {
    trackPostCreate: useCallback((postId: string) => {
      trackEvent({
        eventType: 'post_create',
        metadata: { postId, timestamp: Date.now() },
      });
    }, [trackEvent]),

    trackPostLike: useCallback((postId: string) => {
      trackEvent({
        eventType: 'post_like',
        metadata: { postId, timestamp: Date.now() },
      });
    }, [trackEvent]),

    trackPostComment: useCallback((postId: string) => {
      trackEvent({
        eventType: 'post_comment',
        metadata: { postId, timestamp: Date.now() },
      });
    }, [trackEvent]),

    trackUserProfileView: useCallback((userId: string) => {
      trackEvent({
        eventType: 'user_profile_view',
        metadata: { userId, timestamp: Date.now() },
      });
    }, [trackEvent]),

    trackFollowUser: useCallback((userId: string) => {
      trackEvent({
        eventType: 'follow_user',
        metadata: { userId, timestamp: Date.now() },
      });
    }, [trackEvent]),
  };
}

/**
 * Hook to track marketplace events
 */
export function useMarketplaceTracking() {
  const { trackEvent } = useJourney();

  return {
    trackProductView: useCallback((productId: string, productName: string) => {
      trackEvent({
        eventType: 'product_view',
        metadata: { productId, productName, timestamp: Date.now() },
      });
    }, [trackEvent]),

    trackAddToCart: useCallback((productId: string, quantity: number) => {
      trackEvent({
        eventType: 'product_add_to_cart',
        metadata: { productId, quantity, timestamp: Date.now() },
      });
    }, [trackEvent]),

    trackCheckoutStart: useCallback(() => {
      trackEvent({
        eventType: 'checkout_start',
        metadata: { timestamp: Date.now() },
      });
    }, [trackEvent]),

    trackCheckoutComplete: useCallback((orderId: string, total: number) => {
      trackEvent({
        eventType: 'checkout_complete',
        metadata: { orderId, total, timestamp: Date.now() },
      });
    }, [trackEvent]),

    trackProductSearch: useCallback((query: string, resultCount: number) => {
      trackEvent({
        eventType: 'product_search',
        metadata: { query, resultCount, timestamp: Date.now() },
      });
    }, [trackEvent]),
  };
}

// Re-export React for useTimeOnPage
import * as React from 'react';
