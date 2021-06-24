import { Injectable } from '@nestjs/common';
import { UploadApiResponse, UploadStream, UploadApiErrorResponse } from 'cloudinary';
import cloudinary from './configs';
import { ReadStream } from './types';



@Injectable()
export class CloudinaryAdapter {

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