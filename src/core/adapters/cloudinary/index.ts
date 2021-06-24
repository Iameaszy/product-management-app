import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UploadApiResponse, UploadStream, UploadApiErrorResponse, v2 as cloudinary } from 'cloudinary';
import { EnvTypes } from 'src/config/types';
import { ReadStream } from './types';


@Injectable()
export class CloudinaryAdapter {
    constructor(
        private configService: ConfigService<EnvTypes>
    ) {
        cloudinary.config({
            api_key: this.configService.get("cloudinaryApiKey"),
            api_secret: this.configService.get("cloudinaryApiSecret"),
            cloud_name: this.configService.get("cloudinaryCloudName"),
        });
    }

    public async uploadFile(filepath: string) {
        return cloudinary.uploader.upload(filepath);
    }

    public async uploadFileAsStream(createReadStream: ReadStream): Promise<UploadApiResponse> {
        return new Promise((resolve, reject) => {
            const stream: UploadStream = cloudinary.uploader.upload_stream({ folder: 'avatars' }, (err?: UploadApiErrorResponse, result?: UploadApiResponse) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result!);
            });
            return createReadStream().pipe(stream);
        });
    }

    public async deleteFile(path: string) {
        return cloudinary.uploader.destroy(path);
    }
}