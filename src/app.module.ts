import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationsController } from './controllers/NotificationsController';
import { SnsService } from './services/sns.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(), // Load environment variables
  ],
  controllers: [AppController, NotificationsController],
  providers: [AppService, SnsService],
  exports: [SnsService], // Export if other modules need SNS
})
export class AppModule {}
