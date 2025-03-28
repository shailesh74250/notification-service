import { Injectable } from '@nestjs/common';
import * as twilio from 'twilio';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SmsService {
  private client;

  constructor(private configService: ConfigService) {
    this.client = twilio(
      this.configService.get('TWILIO_ACCOUNt_SID'),
      this.configService.get('TWILIO_AUTH_TOKEN'),
    );
  }

  async sendSms(to: string, message: string) {
    await this.client.message.create({
      body: message,
      from: this.configService.get('TWILIO_PHONE_NUMBER'),
      to,
    });
  }
}
