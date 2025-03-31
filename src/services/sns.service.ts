import { Injectable } from '@nestjs/common';
import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SnsService {
  private snsClient: SNSClient;

  constructor(private configService: ConfigService) {
    this.snsClient = new SNSClient({
      region: this.configService.get<string>('AWS_REGION') || 'us-east-1', // Default region fallback
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID') ?? '',
        secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY') ?? '',
      },
    });
  }

  async sendSms(phoneNumber: string, message: string) {
    try {
      const params = {
        Message: message,
        PhoneNumber: phoneNumber,
      };

      const command = new PublishCommand(params);
      const response = await this.snsClient.send(command);
      return response;
    } catch (error) {
      console.error('SNS SMS Error:', error);
      throw error;
    }
  }

  async sendEmail(topicArn: string, subject: string, message: string) {
    try {
      const params = {
        Message: message,
        Subject: subject,
        TopicArn: topicArn,
      };

      const command = new PublishCommand(params);
      const response = await this.snsClient.send(command);
      return response;
    } catch (error) {
      console.error('SNS Email Error:', error);
      throw error;
    }
  }

  async sendPushNotification(targetArn: string, message: string) {
    try {
      const params = {
        Message: JSON.stringify({ default: message }),
        MessageStructure: 'json',
        TargetArn: targetArn,
      };

      const command = new PublishCommand(params);
      const response = await this.snsClient.send(command);
      return response;
    } catch (error) {
      console.error('SNS Push Error:', error);
      throw error;
    }
  }
}
