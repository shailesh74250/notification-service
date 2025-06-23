import { Injectable } from '@nestjs/common';
import { NotificationProvider, NotificationMessage, NotificationResult } from '../../../interfaces/notification.interface';
import axios from 'axios';

@Injectable()
export class SmsProvider implements NotificationProvider {
  private config: any;

  constructor(config: any) {
    this.config = config;
  }

  async send(message: NotificationMessage): Promise<NotificationResult> {
    try {
      const payload = {
        sender: this.config.msg91Sender, // e.g., "MSGIND"
        route: this.config.msg91Route || '4', // '4' for transactional
        country: '91',
        sms: [
          {
            message: message.content,
            to: [message.recipient],
          },
        ],
      };

      const response = await axios.post(
        'https://api.msg91.com/api/v2/sendsms',
        payload,
        {
          headers: {
            'authkey': this.config.msg91AuthKey,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.type === 'success') {
        return {
          success: true,
          messageId: response.data.messages?.[0]?.message || '',
          timestamp: new Date(),
        };
      } else {
        return {
          success: false,
          error: response.data.message || 'Unknown error',
          timestamp: new Date(),
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date(),
      };
    }
  }

  async isHealthy(): Promise<boolean> {
    // MSG91 does not provide a direct health check endpoint.
    // Optionally, you can implement a balance check or send a test SMS.
    return true;
  }
}
