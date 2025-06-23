import { Injectable } from '@nestjs/common';
import { NotificationProvider, NotificationResult } from '../../../interfaces/notification.interface';
import { NotificationMessageDto } from '../interfaces/notification.dto';

interface QueueItem {
  message: NotificationMessageDto;
  provider: NotificationProvider;
  attempts: number;
  nextRetry?: Date;
}

@Injectable()
export class NotificationQueue {
  private queue: QueueItem[] = [];
  private processing = false;
  private config: any;

  constructor(config?: any) {
    this.config = {
      retryAttempts: 3,
      retryDelay: 1000,
      ...config
    };
    this.startProcessing();
  }

  async enqueue(message: NotificationMessageDto, provider: NotificationProvider): Promise<NotificationResult> {
    const queueItem: QueueItem = {
      message: { ...message, id: message.id || `msg_${Date.now()}` },
      provider,
      attempts: 0
    };

    this.queue.push(queueItem);
    
    return {
      success: true,
      messageId: queueItem.message.id,
      timestamp: new Date()
    };
  }

  private async startProcessing(): Promise<void> {
    if (this.processing) return;
    this.processing = true;

    while (this.processing) {
      await this.processQueue();
      await this.delay(100);
    }
  }

  private async processQueue(): Promise<void> {
    const now = new Date();
    const readyItems = this.queue.filter(item => 
      !item.nextRetry || item.nextRetry <= now
    );

    for (const item of readyItems) {
      try {
        const result = await item.provider.send(item.message);
        
        if (result.success) {
          this.removeFromQueue(item);
        } else {
          await this.handleFailure(item);
        }
      } catch (error) {
        await this.handleFailure(item);
      }
    }
  }

  private async handleFailure(item: QueueItem): Promise<void> {
    item.attempts++;
    
    if (item.attempts >= this.config.retryAttempts) {
      console.error(`Failed to send notification ${item.message.id} after ${item.attempts} attempts`);
      this.removeFromQueue(item);
    } else {
      item.nextRetry = new Date(Date.now() + this.config.retryDelay * item.attempts);
    }
  }

  private removeFromQueue(item: QueueItem): void {
    const index = this.queue.indexOf(item);
    if (index > -1) {
      this.queue.splice(index, 1);
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  stop(): void {
    this.processing = false;
  }
}
