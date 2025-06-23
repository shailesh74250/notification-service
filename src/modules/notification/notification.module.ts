import { Module } from '@nestjs/common';
import { NotificationController } from './api/notification.controller';
import { NotificationService } from './services/notification.service';
import { BullMQModule } from 'src/shared/bullmq/bullmq.module';

@Module({
   imports: [
    BullMQModule.forFeature(['notifications']),
    // ...other imports
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
