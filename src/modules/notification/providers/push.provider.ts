import { Injectable } from '@nestjs/common';
import { NotificationProvider, NotificationMessage, NotificationResult } from '../interfaces/notification.interface';
import * as admin from 'firebase-admin';

@Injectable()
export class PushProvider implements NotificationProvider {
  private config: any;

  constructor(config: any) {
    this.config = config;
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(config.firebaseServiceAccount),
      });
    }
  }

  async send(message: NotificationMessage): Promise<NotificationResult> {
    try {
      const payload: admin.messaging.Message = {
        token: message.recipient, // FCM device/browser token
        notification: {
          title: message.subject || 'Notification',
          body: message.content,
        },
        data: message.data || {},
      };

      const response = await admin.messaging().send(payload);

      return {
        success: true,
        messageId: response,
        timestamp: new Date(),
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date(),
      };
    }
  }

  async isHealthy(): Promise<boolean> {
    // Optionally, implement a health check (e.g., send a test message)
    return true;
  }
}