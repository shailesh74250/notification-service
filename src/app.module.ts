import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { NotificationController } from './controllers/notification.controller'
import { AppService } from './app.service';
import { EmailService } from './services/email.service';
import { SmsService } from './services/sms.service';
import { PushService } from './services/push.service';
import { NotificationListener } from './listeners/notification.listener';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9092'], // Replace with actual broker URL
          },
          consumer: {
            groupId: 'notification-service-group',
          },
        },
      },
    ]),
  ],
  controllers: [AppController, NotificationController],
  providers: [AppService, EmailService, SmsService, PushService, NotificationListener],
})
export class AppModule {}
