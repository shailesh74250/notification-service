import { Injectable } from '@nestjs/common';
import { NotificationProvider, NotificationResult } from '../interfaces/notification.interface';
import * as nodemailer from 'nodemailer';
import {NotificationMessageDto} from '../dto/notification.dto';

@Injectable()
export class EmailProvider implements NotificationProvider {
  private config: any;
  private transporter: nodemailer.Transporter;

  constructor(config: any) {
    this.config = config;
    this.transporter = nodemailer.createTransport({
      host: config.smtpHost,
      port: config.smtpPort,
      secure: config.smtpSecure, // true for 465, false for other ports
      auth: {
        user: config.smtpUser,
        pass: config.smtpPass,
      },
    });
  }

  async send(message: NotificationMessageDto): Promise<NotificationResult> {
    try {
      const mailOptions = {
        from: this.config.fromEmail,
        to: message.recipient,
        subject: message.subject,
        text: message.body,
        html: message.htmlBody || undefined,
      };

      const info = await this.transporter.sendMail(mailOptions);

      return {
        success: true,
        messageId: info.messageId,
        timestamp: new Date(),
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date(),
      };
    }
  }

  async isHealthy(): Promise<boolean> {
    try {
      await this.transporter.verify();
      return true;
    } catch {
      return false;
    }
  }
}
