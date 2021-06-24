import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvTypes } from 'src/config/types';
import nodemailer from 'nodemailer'
import { RawMailData } from '../types';
import { MailOptions } from './types';


@Injectable()
export class EmailAdapter {
  private transporter: nodemailer.Transporter;

  private nodemailUsername?: string;

  private nodemailPassword?: string;

  constructor(
    private config: ConfigService<EnvTypes>,
  ) {
    this.nodemailUsername = this.config.get("nodemailerUsername");
    this.nodemailPassword = this.config.get("nodemailerPassword")

    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: this.nodemailUsername,
        pass: this.nodemailPassword
      }
    });


  }


  public async sendEmail({ to, subject, text }: MailOptions) {

    const mailOptions = {
      from: this.nodemailUsername || "yusufolagcp@gmail.com",
      to,
      subject,
      text
    };

    this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    });
  }
}
