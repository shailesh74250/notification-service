export class NotificationDto {
  channel: 'email' | 'sms' | 'push';
  recipient: string;
  message: string;
  subject?: string; // Required only for emails
}