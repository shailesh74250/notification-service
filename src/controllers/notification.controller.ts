import { Controller, Post, Body } from '@nestjs/common';
import { NotificationDto } from '../dto/notification.dto';
import { EmailService } from '../services/email.service';
import { SmsService } from '../services/sms.service';
import { PushService } from '../services/push.service';

@Controller('notifications')
export class NotificationController {
  constructor(
    private emailService: EmailService,
    private smsService: SmsService,
    private pushService: PushService,
  ) {}

  @Post('send')
  async sendNotification(@Body() dto: NotificationDto) {
    switch (dto.channel) {
      case 'email':
        await this.emailService.sendEmail(
          dto.recipient,
          dto.subject ?? '',
          dto.message,
        );
        return { success: true, message: 'Email sent successfully' };
      case 'sms':
        await this.smsService.sendSms(dto.recipient, dto.message);
        return { success: true, message: 'SMS sent successfully' };
      case 'push':
        await this.pushService.sendPush(dto.recipient, dto.message);
        return {
          success: true,
          message: 'Push notification sent successfully',
        };
      default:
        return { success: false, message: 'Invalid notification channel' };
    }
  }
}
