import { Processor, Process } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { NotificationProvider } from '../interfaces/notification.interface';
import { EmailProvider } from '../providers/email.provider';
import { SmsProvider } from '../providers/sms.provider';
import { PushProvider } from '../providers/push.provider';

@Processor('notifications')
export class NotificationProcessor {
  private logger = new Logger(NotificationProcessor.name);
  private providers: Map<string, NotificationProvider> = new Map();

  constructor(
    private emailProvider: EmailProvider,
    private smsProvider: SmsProvider,
    private pushProvider: PushProvider,
  ) {
    this.providers.set('email', emailProvider);
    this.providers.set('sms', smsProvider);
    this.providers.set('push', pushProvider);
  }

  @Process('send')
  async handleSendNotification(job: any) {
    this.logger.debug(`Processing notification job ${job.id}`);
    
    const message = job.data;
    const provider = this.providers.get(message.type);
    
    if (!provider) {
      throw new Error(`No provider found for notification type: ${message.type}`);
    }
    
    const result = await provider.send(message);
    
    if (!result.success) {
      this.logger.error(`Failed to send ${message.type} notification: ${result.error}`);
      throw new Error(result.error);
    }
    
    return result;
  }
}