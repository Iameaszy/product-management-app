export type SmsRequestParams = {
    to: string,
    from: string,
    sms: string,
    type: string,
    api_key: string,
    channel: 'dnd' | 'generic' | 'whatsapp'
};


export type SmsResponse = {
    message_id: string;
    message: string;
    balance: number;
    user: string;
};


export type RawMailData = {
    to: string;
    subject?: string;
    text: string;
    html?: string;
};