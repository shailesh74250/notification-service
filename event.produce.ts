import { Injectable, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class NotificationService {
  constructor(@Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka) {}

  async sendNotification(data: any) {
    this.kafkaClient.emit('notification.send', data);
  }
}
