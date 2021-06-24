import { resolve } from 'path';
import { EnvTypes } from './types';

export default (): EnvTypes => {
    const environment = process.env.NODE_ENV || 'development';
    return {
        port: parseInt(process.env.PORT || '3000', 10),
        dbUrl:
            process.env.DB_URL ||
            'postgresql://gofapay:(gofapay2020)@localhost:5432/gofapay',
        environment,
        emailApikey: process.env.EMAIL_API_KEY || '',
        smsApikey: process.env.SMS_API_KEY || '',
        appUrl: process.env.APP_URL || 'https://gofapay-backecnd-qa.herokuapp.com',
        appEmail: process.env.APP_EMAIL || 'gofapay@gmail.com',
        defaultSendingEmailAddress: process.env.DEFAULT_SENDING_EMAIL_ADDRESS || '',
        mailgunDomain: process.env.MAILGUN_DOMAIN || '',
        rootDir: resolve(__dirname, '../../'),
        workDir: resolve(__dirname, '../'),
        uploadDir: resolve(__dirname, '../', 'upload'),
        cloudinaryApiKey: process.env.CLOUDINARY_API_KEY || '',
        cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET || '',
        cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME || 'gofapay',
        secretKey: process.env.SECRET_KEY || "",
        geocodingApiKey: process.env.GEOCODING_API_KEY || "",
        nodemailerPassword: process.env.NODEMAILER_PASSWORD || "",
        nodemailerUsername: process.env.NODEMAILER_USERNAME || "",
    };
};
