import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvTypes } from 'src/config/types';

import { SmsRequestParams, SmsResponse } from '../types';


@Injectable()
export class SmsAdapter {
    constructor(
        private httpService: HttpService, private config: ConfigService<EnvTypes>,
    ) { }

    public async sendSms({ to, body }: { to: string, body: string }): Promise<any> {
        const smsApiUrl = 'https://termii.com/api/sms/send';
        const emailApiKey = this.config.get('smsApikey');
        const data: SmsRequestParams = {
            to,
            from: 'Gofapay',
            sms: body,
            type: 'plain',
            api_key: emailApiKey,
            channel: 'generic',
        };

        return this.httpService.post<SmsResponse>(smsApiUrl, data, { headers: { 'content-type': 'application/json' } }).toPromise();
    }
}
