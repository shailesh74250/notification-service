import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PushService {

  constructor(private configService: ConfigService) {
    const credentials = this.configService.get('FIREBASE_CREDENTIALS')
    const parsedCreds = JSON.parse(credentials)
    admin.initializeApp({
      credential: admin.credential.cert(parsedCreds),
    });
  }

  async sendPush(deviceToken: string, message: string) {
    await admin.messaging().send({
      token: deviceToken,
      notification: {
        title: 'New Notification',
        body: message,
      }
    })
  }
}
