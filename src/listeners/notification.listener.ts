import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { EmailService } from 'src/services/email.service';
import { SmsService } from 'src/services/sms.service';
import { PushService } from 'src/services/push.service';

@Injectable()
export class NotificationListener implements OnModuleInit {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
    private readonly emailService: EmailService,
    private readonly smsService: SmsService,
    private readonly pushService: PushService,
  ) {}

  async onModuleInit() {
    // Ensure the service is subscribed to Kafka topics
    this.kafkaClient.subscribeToResponseOf('notification.send');
    await this.kafkaClient.connect();
  }

  async handleNotification(data: any) {
    const { channel, recipient, message, subject } = data;

    switch (channel) {
      case 'email':
        await this.emailService.sendEmail(recipient, subject, message);
        break;
      case 'sms':
        await this.smsService.sendSms(recipient, message);
        break;
      case 'push':
        await this.pushService.sendPush(recipient, message);
        break;
      default:
        console.warn(`Unknown notification channel: ${channel}`);
    }
  }
}
