import { Injectable } from '@nestjs/common';
import firebaseAdmin, { credential } from 'firebase-admin';
import serviceAccount from './tradeport-1e2d3-firebase-adminsdk-bepw5-be1458bc5d.json';
import { notificationOptions } from './constants';
import { NotificationPayload } from './types';



@Injectable()
export class FirebaseAdapter {
    public admin: typeof firebaseAdmin;

    constructor() {
        firebaseAdmin.initializeApp({
            credential: credential.cert(serviceAccount as firebaseAdmin.ServiceAccount),
        });

        this.admin = firebaseAdmin;
    }

    public async sendNotification(deviceTokens: string[], notificationPayload: NotificationPayload) {
        return this.admin.messaging().sendToDevice(deviceTokens, { notification: notificationPayload }, notificationOptions);
    }
}
