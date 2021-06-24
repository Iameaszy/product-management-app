import { CacheModule, HttpModule, Module } from '@nestjs/common';
import { CloudinaryAdapter } from './cloudinary';
import { EmailAdapter } from './email';
import { FirebaseAdapter } from './firebase';
import { GeocodingAdapter } from './geocoding';
import { SmsAdapter } from './sms';

@Module({
    imports: [HttpModule, CacheModule.register()],
    providers: [SmsAdapter, EmailAdapter, CloudinaryAdapter, FirebaseAdapter],
    exports: [SmsAdapter, EmailAdapter, CloudinaryAdapter, FirebaseAdapter, GeocodingAdapter],
})
export class AdaptersModule { }
