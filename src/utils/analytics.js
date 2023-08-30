// Analytics utility functions for tracking user interactions

class Analytics {
  constructor() {
    this.isEnabled = process.env.NODE_ENV === 'production';
    this.userId = null;
    this.sessionId = this.generateSessionId();
  }

  generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  setUserId(userId) {
    this.userId = userId;
    if (this.isEnabled) {
      this.track('user_identified', { userId });
    }
  }

  track(eventName, properties = {}) {
    if (!this.isEnabled) {
      console.log('Analytics Event:', eventName, properties);
      return;
    }

    const eventData = {
      event: eventName,
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      userId: this.userId,
      properties: {
        ...properties,
        userAgent: navigator.userAgent,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      }
    };

    // Send to analytics service (e.g., Google Analytics, Mixpanel)
    this.sendToAnalytics(eventData);
  }

  sendToAnalytics(eventData) {
    // Google Analytics 4
    if (window.gtag) {
      window.gtag('event', eventData.event, {
        custom_parameters: eventData.properties
      });
    }

    // Mixpanel
    if (window.mixpanel) {
      window.mixpanel.track(eventData.event, eventData.properties);
    }

    // Custom analytics endpoint
    this.sendToCustomEndpoint(eventData);
  }

  sendToCustomEndpoint(eventData) {
    const endpoint = process.env.REACT_APP_ANALYTICS_ENDPOINT;
    if (!endpoint) return;

    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData)
    }).catch(error => {
      console.error('Analytics error:', error);
    });
  }

  // Predefined tracking methods
  trackPageView(pageName) {
    this.track('page_view', { page: pageName });
  }

  trackWalletConnection(walletType, success) {
    this.track('wallet_connection', { 
      walletType, 
      success,
      timestamp: Date.now()
    });
  }

  trackSpinWheel(spinCost, result, reward) {
    this.track('spin_wheel', {
      spinCost,
      result,
      reward,
      timestamp: Date.now()
    });
  }

  trackPrizeClaim(spinId, reward) {
    this.track('prize_claim', {
      spinId,
      reward,
      timestamp: Date.now()
    });
  }

  trackError(errorType, errorMessage, context) {
    this.track('error', {
      errorType,
      errorMessage,
      context,
      timestamp: Date.now()
    });
  }

  trackUserAction(action, details) {
    this.track('user_action', {
      action,
      details,
      timestamp: Date.now()
    });
  }

  // Performance tracking
  trackPerformance(metric, value) {
    this.track('performance', {
      metric,
      value,
      timestamp: Date.now()
    });
  }

  // A/B testing support
  trackExperiment(experimentName, variant, action) {
    this.track('experiment', {
      experimentName,
      variant,
      action,
      timestamp: Date.now()
    });
  }
}

// Create singleton instance
const analytics = new Analytics();

// Export both the class and instance
export { Analytics };
export default analytics;
