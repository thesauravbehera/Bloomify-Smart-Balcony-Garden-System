/**
 * User Journey Type Definitions
 * Defines all events, states, and tracking for user journey mapping
 */

// Journey Event Types
export type JourneyEventType = 
  // Landing Page Events
  | 'landing_page_view'
  | 'hero_section_view'
  | 'features_section_view'
  | 'interactive_demo_view'
  | 'about_section_view'
  | 'levels_section_view'
  | 'testimonials_view'
  | 'cta_section_view'
  | 'hero_cta_click'
  | 'feature_learn_more_click'
  | 'cta_button_click'
  
  // Authentication Events
  | 'auth_modal_open'
  | 'auth_modal_close'
  | 'sign_up_start'
  | 'sign_up_complete'
  | 'login_start'
  | 'login_complete'
  | 'logout_click'
  | 'logout_complete'
  | 'password_reset_click'
  | 'auth_error'
  
  // Navigation Events
  | 'navigation_click'
  | 'route_change'
  | 'protected_route_attempt'
  | 'back_button_click'
  
  // Dashboard Events
  | 'dashboard_view'
  | 'plant_view'
  | 'plant_add_click'
  | 'plant_water_click'
  | 'plant_fertilize_click'
  | 'plant_health_check_click'
  | 'task_complete'
  | 'task_fail'
  | 'calendar_view'
  | 'activity_feed_view'
  
  // Gamification Events
  | 'garden_page_view'
  | 'levels_tab_view'
  | 'achievements_tab_view'
  | 'challenges_tab_view'
  | 'leaderboard_tab_view'
  | 'challenge_join'
  | 'challenge_complete'
  | 'achievement_unlock'
  | 'xp_earned'
  
  // Community Events
  | 'community_page_view'
  | 'post_view'
  | 'post_create'
  | 'post_like'
  | 'post_comment'
  | 'user_profile_view'
  | 'follow_user'
  | 'chat_message_send'
  | 'garden_showcase_view'
  
  // Marketplace Events
  | 'marketplace_page_view'
  | 'product_view'
  | 'product_add_to_cart'
  | 'cart_view'
  | 'checkout_start'
  | 'checkout_complete'
  | 'product_filter_apply'
  | 'product_search'
  
  // AR Scanner Events
  | 'scanner_page_view'
  | 'camera_permission_request'
  | 'camera_permission_granted'
  | 'camera_permission_denied'
  | 'scan_start'
  | 'scan_complete'
  | 'scan_error'
  
  // Generic Events
  | 'error'
  | 'custom_event';

// Journey Event Data
export interface JourneyEvent {
  eventType: JourneyEventType;
  timestamp: number;
  userId?: string;
  sessionId: string;
  route: string;
  metadata?: Record<string, any>;
  duration?: number; // For timed events
  error?: string;
}

// User Journey Session
export interface JourneySession {
  sessionId: string;
  userId?: string;
  startTime: number;
  endTime?: number;
  events: JourneyEvent[];
  entryPoint: string; // /,/dashboard, etc
  exitPoint?: string;
  duration?: number;
  deviceInfo?: {
    userAgent: string;
    platform: string;
    viewport: { width: number; height: number };
  };
}

// Journey State
export interface JourneyState {
  currentSession: JourneySession | null;
  currentPage: string;
  previousPage?: string;
  isLoading: boolean;
  error?: string;
  events: JourneyEvent[];
  sessionMetrics: {
    totalEvents: number;
    lastEventTime?: number;
    activeTime: number; // Time with user interaction
  };
}

// Journey Metrics for Analytics
export interface JourneyMetrics {
  // Landing Page Metrics
  landingPageViews: number;
  scrollDepth: {
    hero: boolean;
    features: boolean;
    interactive: boolean;
    about: boolean;
    levels: boolean;
    testimonials: boolean;
    cta: boolean;
  };
  ctaClicks: number;
  signUpInitiated: number;
  signUpCompleted: number;
  signUpAbandonmentRate: number;

  // Dashboard Metrics
  dashboardSessions: number;
  avgDashboardTime: number;
  plantActionsCount: number;
  taskCompletionRate: number;

  // Community Metrics
  communityEngagement: {
    postsCreated: number;
    commentsLeft: number;
    profilesViewed: number;
    followsInitiated: number;
  };

  // Marketplace Metrics
  marketplaceConversion: {
    productViews: number;
    addToCartCount: number;
    checkoutInitiated: number;
    purchaseCompleted: number;
    conversionRate: number;
  };

  // Gamification Metrics
  gamificationEngagement: {
    achievementsUnlocked: number;
    xpEarned: number;
    challengesJoined: number;
    challengesCompleted: number;
  };

  // General Metrics
  sessionCount: number;
  totalSessionTime: number;
  bounceRate: number;
  returnUserRate: number;
}

// Journey Context Type
export interface IJourneyContext {
  state: JourneyState;
  trackEvent: (event: Omit<JourneyEvent, 'sessionId' | 'timestamp' | 'route'>) => void;
  startSession: (entryPoint: string, userId?: string) => void;
  endSession: () => void;
  navigateTo: (route: string) => void;
  getSessionMetrics: () => JourneyMetrics;
  clearEvents: () => void;
}
