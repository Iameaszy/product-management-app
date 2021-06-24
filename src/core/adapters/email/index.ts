import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvTypes } from 'src/config/types';
import mailgun from 'mailgun-js';
import { RawMailData } from '../types';



@Injectable()
export class EmailAdapter {
    public mailService: mailgun.Mailgun;

    constructor(
        private config: ConfigService<EnvTypes>,
    ) {
        const mailgunApikKey = this.config.get('emailApikey');
        const mailgunDomain = this.config.get('mailgunDomain');
        this.mailService = mailgun({
            apiKey: mailgunApikKey,
            domain: mailgunDomain,
            host: 'api.eu.mailgun.net',
        });
    }


    public async sendEmail(mailData: RawMailData) {
        return this.mailService.messages().send({
            ...mailData,
            from: this.config.get('defaultSendingEmailAddress') || this.config.get('appEmail') || 'gofapay@gmail.com',
        });
    }
}
