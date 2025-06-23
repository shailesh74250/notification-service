import { NotificationMessageDto, NotificationType, NotificationPriority } from '../dto/notification.dto';

export interface NotificationProvider {
  send(message: NotificationMessageDto): Promise<NotificationResult>;
  isHealthy(): Promise<boolean>;
}

export interface NotificationResult {
  success: boolean;
  messageId?: string;
  error?: string;
  timestamp: Date;
}

export interface NotificationConfig {
  providers: {
    [key in NotificationType]?: any;
  };
  queue?: {
    enabled: boolean;
    retryAttempts: number;
    retryDelay: number;
  };
}
