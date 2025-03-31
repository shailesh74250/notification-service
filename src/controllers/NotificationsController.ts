import { Controller, Post, Body } from '@nestjs/common';
import { SnsService } from '../services/sns.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly snsService: SnsService) {}

  @Post('sms')
  async sendSms(
    @Body() { phone, message }: { phone: string; message: string },
  ) {
    return this.snsService.sendSms(phone, message);
  }

  @Post('email')
  async sendEmail(
    @Body()
    {
      topicArn,
      message,
      subject,
    }: {
      topicArn: string;
      message: string;
      subject: string;
    },
  ) {
    return this.snsService.sendEmail(topicArn, message, subject);
  }

  @Post('push')
  async sendPush(
    @Body() { targetArn, message }: { targetArn: string; message: string },
  ) {
    return this.snsService.sendPushNotification(targetArn, message);
  }
}
