/**
 * User Journey Context Provider
 * Manages all user journey tracking and analytics
 */

import { createContext, useCallback, useReducer, useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router';
import { JourneyState, JourneyEvent, JourneySession, IJourneyContext, JourneyMetrics } from '../types/journey';

// Create the context
export const UserJourneyContext = createContext<IJourneyContext | undefined>(undefined);

// Action types for reducer
type JourneyAction = 
  | { type: 'START_SESSION'; payload: { entryPoint: string; userId?: string } }
  | { type: 'END_SESSION' }
  | { type: 'ADD_EVENT'; payload: JourneyEvent }
  | { type: 'NAVIGATE_TO'; payload: string }
  | { type: 'CLEAR_EVENTS' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload?: string };

// Initial state
const initialState: JourneyState = {
  currentSession: null,
  currentPage: '/',
  isLoading: false,
  events: [],
  sessionMetrics: {
    totalEvents: 0,
    activeTime: 0,
  },
};

// Reducer function
function journeyReducer(state: JourneyState, action: JourneyAction): JourneyState {
  switch (action.type) {
    case 'START_SESSION': {
      const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const newSession: JourneySession = {
        sessionId,
        userId: action.payload.userId,
        startTime: Date.now(),
        events: [],
        entryPoint: action.payload.entryPoint,
        deviceInfo: {
          userAgent: navigator.userAgent,
          platform: navigator.platform,
          viewport: {
            width: window.innerWidth,
            height: window.innerHeight,
          },
        },
      };

      return {
        ...state,
        currentSession: newSession,
        currentPage: action.payload.entryPoint,
        events: [],
        sessionMetrics: {
          totalEvents: 0,
          activeTime: 0,
        },
      };
    }

    case 'END_SESSION': {
      if (state.currentSession) {
        return {
          ...state,
          currentSession: {
            ...state.currentSession,
            endTime: Date.now(),
            duration: Date.now() - state.currentSession.startTime,
          },
        };
      }
      return state;
    }

    case 'ADD_EVENT': {
      const updatedSession = state.currentSession
        ? {
            ...state.currentSession,
            events: [...state.currentSession.events, action.payload],
          }
        : null;

      return {
        ...state,
        currentSession: updatedSession,
        events: [...state.events, action.payload],
        sessionMetrics: {
          ...state.sessionMetrics,
          totalEvents: state.sessionMetrics.totalEvents + 1,
          lastEventTime: action.payload.timestamp,
        },
      };
    }

    case 'NAVIGATE_TO': {
      return {
        ...state,
        previousPage: state.currentPage,
        currentPage: action.payload,
      };
    }

    case 'CLEAR_EVENTS': {
      return {
        ...state,
        events: [],
        currentSession: state.currentSession
          ? {
              ...state.currentSession,
              events: [],
            }
          : null,
        sessionMetrics: {
          totalEvents: 0,
          activeTime: 0,
        },
      };
    }

    case 'SET_LOADING': {
      return {
        ...state,
        isLoading: action.payload,
      };
    }

    case 'SET_ERROR': {
      return {
        ...state,
        error: action.payload,
      };
    }

    default:
      return state;
  }
}

interface UserJourneyProviderProps {
  children: ReactNode;
}

export function UserJourneyProvider({ children }: UserJourneyProviderProps) {
  const [state, dispatch] = useReducer(journeyReducer, initialState);
  const location = useLocation();

  // Initialize session on mount
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    dispatch({
      type: 'START_SESSION',
      payload: {
        entryPoint: location.pathname,
        userId: userId || undefined,
      },
    });
  }, []);

  // Track route changes
  useEffect(() => {
    dispatch({
      type: 'NAVIGATE_TO',
      payload: location.pathname,
    });

    // Auto-track route change event
    trackEvent({
      eventType: 'route_change',
      metadata: {
        from: state.currentPage,
        to: location.pathname,
      },
    });
  }, [location.pathname]);

  // Track page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      dispatch({ type: 'END_SESSION' });
      // Could send session data to server here
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  // Track user activity (active time)
  useEffect(() => {
    let activityTimer: NodeJS.Timeout;

    const handleActivity = () => {
      clearTimeout(activityTimer);
      activityTimer = setTimeout(() => {
        // User is active
      }, 1000);
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('click', handleActivity);
    window.addEventListener('scroll', handleActivity);

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('scroll', handleActivity);
      clearTimeout(activityTimer);
    };
  }, []);

  // Track event
  const trackEvent = useCallback(
    (event: Omit<JourneyEvent, 'sessionId' | 'timestamp' | 'route'>) => {
      if (!state.currentSession) return;

      const journeyEvent: JourneyEvent = {
        ...event,
        sessionId: state.currentSession.sessionId,
        timestamp: Date.now(),
        route: location.pathname,
      };

      dispatch({ type: 'ADD_EVENT', payload: journeyEvent });

      // Log to console in development
      if ((import.meta as any).env.DEV) {
        console.log('[Journey Event]', event.eventType, journeyEvent);
      }
    },
    [state.currentSession, location.pathname]
  );

  // Navigate to route
  const navigateTo = useCallback((route: string) => {
    dispatch({ type: 'NAVIGATE_TO', payload: route });
  }, []);

  // Get session metrics
  const getSessionMetrics = useCallback((): JourneyMetrics => {
    const events = state.events;

    return {
      // Landing Page Metrics
      landingPageViews: events.filter((e) => e.eventType === 'landing_page_view').length,
      scrollDepth: {
        hero: events.some((e) => e.eventType === 'hero_section_view'),
        features: events.some((e) => e.eventType === 'features_section_view'),
        interactive: events.some((e) => e.eventType === 'interactive_demo_view'),
        about: events.some((e) => e.eventType === 'about_section_view'),
        levels: events.some((e) => e.eventType === 'levels_section_view'),
        testimonials: events.some((e) => e.eventType === 'testimonials_view'),
        cta: events.some((e) => e.eventType === 'cta_section_view'),
      },
      ctaClicks: events.filter((e) => e.eventType.includes('cta_click')).length,
      signUpInitiated: events.filter((e) => e.eventType === 'sign_up_start').length,
      signUpCompleted: events.filter((e) => e.eventType === 'sign_up_complete').length,
      signUpAbandonmentRate:
        events.filter((e) => e.eventType === 'sign_up_start').length > 0
          ? 1 - events.filter((e) => e.eventType === 'sign_up_complete').length / events.filter((e) => e.eventType === 'sign_up_start').length
          : 0,

      // Dashboard Metrics
      dashboardSessions: events.filter((e) => e.eventType === 'dashboard_view').length,
      avgDashboardTime: 0, // To be calculated
      plantActionsCount: events.filter((e) => e.eventType.includes('plant_')).length,
      taskCompletionRate: 0, // To be calculated

      // Community Metrics
      communityEngagement: {
        postsCreated: events.filter((e) => e.eventType === 'post_create').length,
        commentsLeft: events.filter((e) => e.eventType === 'post_comment').length,
        profilesViewed: events.filter((e) => e.eventType === 'user_profile_view').length,
        followsInitiated: events.filter((e) => e.eventType === 'follow_user').length,
      },

      // Marketplace Metrics
      marketplaceConversion: {
        productViews: events.filter((e) => e.eventType === 'product_view').length,
        addToCartCount: events.filter((e) => e.eventType === 'product_add_to_cart').length,
        checkoutInitiated: events.filter((e) => e.eventType === 'checkout_start').length,
        purchaseCompleted: events.filter((e) => e.eventType === 'checkout_complete').length,
        conversionRate: 0, // To be calculated
      },

      // Gamification Metrics
      gamificationEngagement: {
        achievementsUnlocked: events.filter((e) => e.eventType === 'achievement_unlock').length,
        xpEarned: events.reduce((sum, e) => {
          if (e.eventType === 'xp_earned' && e.metadata?.xp) {
            return sum + e.metadata.xp;
          }
          return sum;
        }, 0),
        challengesJoined: events.filter((e) => e.eventType === 'challenge_join').length,
        challengesCompleted: events.filter((e) => e.eventType === 'challenge_complete').length,
      },

      // General Metrics
      sessionCount: 1,
      totalSessionTime: state.currentSession ? Date.now() - state.currentSession.startTime : 0,
      bounceRate: 0, // To be calculated
      returnUserRate: 0, // To be calculated
    };
  }, [state.events, state.currentSession]);

  // Clear events
  const clearEvents = useCallback(() => {
    dispatch({ type: 'CLEAR_EVENTS' });
  }, []);

  const value: IJourneyContext = {
    state,
    trackEvent,
    startSession: (entryPoint, userId) =>
      dispatch({ type: 'START_SESSION', payload: { entryPoint, userId } }),
    endSession: () => dispatch({ type: 'END_SESSION' }),
    navigateTo,
    getSessionMetrics,
    clearEvents,
  };

  return (
    <UserJourneyContext.Provider value={value}>{children}</UserJourneyContext.Provider>
  );
}
