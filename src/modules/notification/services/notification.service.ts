import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { NotificationProvider, NotificationMessage, NotificationResult, NotificationType } from '../../../interfaces/notification.interface';
import { EmailProvider } from '../providers/email.provider';
import { SmsProvider } from '../providers/sms.provider';
import { PushProvider } from '../providers/push.provider';

@Injectable()
export class NotificationService {
  private providers: Map<NotificationType, NotificationProvider> = new Map();

  constructor(
    @InjectQueue('notifications') private notificationQueue: Queue,
    private config: any,
  ) {
    this.initializeProviders();
  }

  private initializeProviders(): void {
    if (this.config.providers.email) {
      this.providers.set(NotificationType.EMAIL, new EmailProvider(this.config.providers.email));
    }
    if (this.config.providers.sms) {
      this.providers.set(NotificationType.SMS, new SmsProvider(this.config.providers.sms));
    }
    if (this.config.providers.push) {
      this.providers.set(NotificationType.PUSH, new PushProvider(this.config.providers.push));
    }
  }

  async send(message: NotificationMessage): Promise<NotificationResult> {
    try {
      // Add job to queue with priority (optional)
      const job = await this.notificationQueue.add('send', message, {
        priority: message.priority || 5, // Lower number = higher priority
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 5000,
        },
      });

      return {
        success: true,
        messageId: job.id.toString(),
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

  async sendBulk(messages: NotificationMessage[]): Promise<NotificationResult[]> {
    const results: NotificationResult[] = [];
    
    for (const message of messages) {
      results.push(await this.send(message));
    }
    
    return results;
  }

  registerProvider(type: NotificationType, provider: NotificationProvider): void {
    this.providers.set(type, provider);
  }

  async getHealthStatus(): Promise<Record<string, boolean>> {
    const healthChecks = Array.from(this.providers.entries()).map(async ([type, provider]) => {
      const healthy = await provider.isHealthy();
      return [type, healthy] as const;
    });

    const results = await Promise.all(healthChecks);
    return Object.fromEntries(results);
  }
}
