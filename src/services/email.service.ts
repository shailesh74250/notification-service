import { Injectable } from "@nestjs/common"
import * as nodemailer  from 'nodemailer'
import { ConfigService } from "@nestjs/config"

@Injectable()
export class EmailService {
  private transporter

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('SMTP_HOST'),
      port: this.configService.get('SMTP_PORT'),
      auth: {
        user: this.configService.get('SMTP_USER'),
        pass: this.configService.get('SMTP_PASS'),
      }
    })
  }

  async sendEmail(to: string, subject: string, text: string) {
    await this.transporter.sendEmail({
      from: this.configService.get('SMTP_USER'),
      to,
      subject,
      text,
    })
  }
}