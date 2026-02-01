/**
 * Analytics Service
 * Handles sending journey data to backend for analysis
 */

import { JourneyEvent, JourneySession, JourneyMetrics } from '../types/journey';

interface AnalyticsConfig {
  apiEndpoint?: string;
  batchSize?: number;
  batchInterval?: number;
  enableLocalStorage?: boolean;
  enableConsoleLogging?: boolean;
}

interface BatchedEvents {
  events: JourneyEvent[];
  timestamp: number;
  sessionId: string;
}

class AnalyticsService {
  private config: Required<AnalyticsConfig>;
  private eventQueue: JourneyEvent[] = [];
  private batchTimer: NodeJS.Timeout | null = null;
  private readonly STORAGE_KEY = 'bloomify_analytics_queue';

  constructor(config: AnalyticsConfig = {}) {
    this.config = {
      apiEndpoint: config.apiEndpoint || '/api/analytics',
      batchSize: config.batchSize || 50,
      batchInterval: config.batchInterval || 30000, // 30 seconds
      enableLocalStorage: config.enableLocalStorage !== false,
      enableConsoleLogging: config.enableConsoleLogging ?? (import.meta as any).env.DEV,
    };

    // Load any persisted events from localStorage
    this.loadPersistedEvents();

    // Start batch processing
    this.startBatchProcessing();
  }

  /**
   * Add event to queue for batching
   */
  public trackEvent(event: JourneyEvent): void {
    this.eventQueue.push(event);

    if (this.config.enableConsoleLogging) {
      console.log('[Analytics] Event queued:', event.eventType, {
        queueSize: this.eventQueue.length,
        timestamp: new Date(event.timestamp).toISOString(),
      });
    }

    // Send immediately if batch size reached
    if (this.eventQueue.length >= this.config.batchSize) {
      this.flushEvents();
    }
  }

  /**
   * Add multiple events to queue
   */
  public trackMultiple(events: JourneyEvent[]): void {
    events.forEach((event) => this.trackEvent(event));
  }

  /**
   * Send all queued events to backend
   */
  public async flushEvents(): Promise<void> {
    if (this.eventQueue.length === 0) {
      return;
    }

    const eventsToSend = [...this.eventQueue];
    const sessionId = eventsToSend[0]?.sessionId;

    if (this.config.enableConsoleLogging) {
      console.log(
        `[Analytics] Flushing ${eventsToSend.length} events for session ${sessionId}`
      );
    }

    try {
      await this.sendBatch(eventsToSend);
      this.eventQueue = [];
      this.clearPersistedEvents();
    } catch (error) {
      console.error('[Analytics] Failed to send events:', error);

      // Persist events for retry on next session
      if (this.config.enableLocalStorage) {
        this.persistEvents(eventsToSend);
      }
    }
  }

  /**
   * Send a batch of events to the backend
   */
  private async sendBatch(events: JourneyEvent[]): Promise<Response> {
    const batch: BatchedEvents = {
      events,
      timestamp: Date.now(),
      sessionId: events[0]?.sessionId || '',
    };

    const response = await fetch(this.config.apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(batch),
    });

    if (!response.ok) {
      throw new Error(`Analytics API error: ${response.status} ${response.statusText}`);
    }

    if (this.config.enableConsoleLogging) {
      console.log(`[Analytics] Successfully sent ${events.length} events`);
    }

    return response;
  }

  /**
   * Process session metrics and send summary
   */
  public async sendSessionMetrics(session: JourneySession, metrics: JourneyMetrics): Promise<void> {
    try {
      const response = await fetch(`${this.config.apiEndpoint}/session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session,
          metrics,
          timestamp: Date.now(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Session metrics API error: ${response.status}`);
      }

      if (this.config.enableConsoleLogging) {
        console.log('[Analytics] Session metrics sent successfully');
      }
    } catch (error) {
      console.error('[Analytics] Failed to send session metrics:', error);
    }
  }

  /**
   * Get analytics summary for debugging
   */
  public getAnalyticsSummary(): Record<string, any> {
    const eventCounts: Record<string, number> = {};

    this.eventQueue.forEach((event) => {
      eventCounts[event.eventType] = (eventCounts[event.eventType] || 0) + 1;
    });

    return {
      queuedEvents: this.eventQueue.length,
      eventCounts,
      oldestEvent: this.eventQueue[0]?.timestamp,
      newestEvent: this.eventQueue[this.eventQueue.length - 1]?.timestamp,
    };
  }

  /**
   * Clear all queued events
   */
  public clearQueue(): void {
    this.eventQueue = [];
    this.clearPersistedEvents();
  }

  /**
   * Start the batch processing interval
   */
  private startBatchProcessing(): void {
    this.batchTimer = setInterval(() => {
      if (this.eventQueue.length > 0) {
        this.flushEvents();
      }
    }, this.config.batchInterval);
  }

  /**
   * Stop batch processing
   */
  public stopBatchProcessing(): void {
    if (this.batchTimer) {
      clearInterval(this.batchTimer);
      this.batchTimer = null;
    }
  }

  /**
   * Persist events to localStorage for recovery
   */
  private persistEvents(events: JourneyEvent[]): void {
    try {
      const existing = localStorage.getItem(this.STORAGE_KEY);
      const previousEvents = existing ? JSON.parse(existing) : [];
      const combined = [...previousEvents, ...events];

      // Keep only last 1000 events to avoid storage bloat
      const limited = combined.slice(-1000);

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(limited));

      if (this.config.enableConsoleLogging) {
        console.log(
          `[Analytics] Persisted ${events.length} events (total: ${limited.length})`
        );
      }
    } catch (error) {
      console.error('[Analytics] Failed to persist events:', error);
    }
  }

  /**
   * Load persisted events from localStorage
   */
  private loadPersistedEvents(): void {
    try {
      const persisted = localStorage.getItem(this.STORAGE_KEY);
      if (persisted) {
        const events = JSON.parse(persisted) as JourneyEvent[];
        this.eventQueue = [...events, ...this.eventQueue];

        if (this.config.enableConsoleLogging) {
          console.log(`[Analytics] Loaded ${events.length} persisted events`);
        }
      }
    } catch (error) {
      console.error('[Analytics] Failed to load persisted events:', error);
    }
  }

  /**
   * Clear persisted events
   */
  private clearPersistedEvents(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.error('[Analytics] Failed to clear persisted events:', error);
    }
  }

  /**
   * Flush all events and stop processing before cleanup
   */
  public async cleanup(): Promise<void> {
    this.stopBatchProcessing();
    await this.flushEvents();
  }
}

// Create singleton instance
let analyticsInstance: AnalyticsService | null = null;

/**
 * Get or create analytics service instance
 */
export function getAnalyticsService(config?: AnalyticsConfig): AnalyticsService {
  if (!analyticsInstance) {
    analyticsInstance = new AnalyticsService(config);
  }
  return analyticsInstance;
}

/**
 * Initialize analytics service
 */
export function initializeAnalytics(config?: AnalyticsConfig): AnalyticsService {
  analyticsInstance = new AnalyticsService(config);
  return analyticsInstance;
}

/**
 * Hook for cleanup on app unmount
 */
export async function cleanupAnalytics(): Promise<void> {
  if (analyticsInstance) {
    await analyticsInstance.cleanup();
  }
}

export default AnalyticsService;
