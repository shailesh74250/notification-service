import { Controller, Post, Body, Get, HttpException, HttpStatus } from '@nestjs/common';
import { NotificationService } from '../services/notification.service';
import { NotificationMessageDto } from '../dto/notification.dto';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('send')
  async sendNotification(@Body() message: NotificationMessageDto) {
    try {
      const result = await this.notificationService.send(message);
      if (!result.success) {
        throw new HttpException(result, HttpStatus.BAD_REQUEST);
      }
      return result;
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          error: 'Internal server error',
          timestamp: new Date(),
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('bulk')
  async sendBulkNotifications(@Body('messages') messages: NotificationService[]) {
    try {
      const results = await this.notificationService.sendBulk(messages);
      return { results };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          error: 'Internal server error',
          timestamp: new Date(),
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('health')
  async getHealth() {
    try {
      const health = await this.notificationService.getHealthStatus();
      return { health };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          error: 'Internal server error',
          timestamp: new Date(),
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
