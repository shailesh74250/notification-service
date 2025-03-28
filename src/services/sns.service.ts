import { PublishCommand } from "@aws-sdk/client-sns";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable
export class SnsService {
  private snsClient: SNSClient;

  constructor(private configService: ConfigService) {
    this.snsClient = new SnsService({
      region: this.configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      }
    })
  }

  async sendSms(phoneNumber: string, message: string) {
    const command = new PublishCommand({
      Message: message,
      PhoneNumber: phoneNumber,
    })
    return this.snsClient.send(command)
  }

  async sendEmail(topicArn: string, message: string, subject: string) {
    const command = new PublishCommand({
      Message: message,
      Subject: subject,
      TopicArn: topicArn,
    });

    return this.snsClient.send(command);
  }

  async sendPushNotification(targetArn: string, message: string) {
    const command = new PublishCommand({
      Message: JSON.stringify({
        default: message,
        APNS: JSON.stringify({
          aps: { alert: message, sound: 'default' },
        }),
        GCM: JSON.stringify({
          notification: { body: message, title: 'New Notification' },
        }),
      }),
      MessageStructure: 'json',
      TargetArn: targetArn,
    });

    return this.snsClient.send(command);
  }
}