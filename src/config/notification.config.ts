export const notificationConfig = {
  providers: {
    email: {
      enabled: true,
      // Add your email provider configuration here (e.g., API keys, sender, etc.)
    },
    sms: {
      enabled: true,
      // Add your SMS provider configuration here (e.g., API keys, sender, etc.)
    },
    push: {
      enabled: true,
      // Add your push provider config here (e.g., FCM credentials)
    }
  },
  queue: {
    enabled: true,
    retryAttempts: 3,
    retryDelay: 1000
  }
};
