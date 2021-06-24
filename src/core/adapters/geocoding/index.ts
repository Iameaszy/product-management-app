import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nodeGeocoder, { Geocoder } from 'node-geocoder';
import { EnvTypes } from 'src/config/types';
import { Address } from './types';


@Injectable()
export class GeocodingAdapter {
    geocoder: Geocoder;

    constructor(
        private config: ConfigService<EnvTypes>,
    ) {
        const apiKey = this.config.get("geocodingApiKey");
        this.geocoder = nodeGeocoder({
            provider: "google",
            apiKey,
            formatter: null,
        });
    }

    public async geocode({ streetAddress, ...rest }: Address) {
        const loc = await this.geocoder.geocode({ ...rest, address: streetAddress })
        return loc?.[0] || null
    }
}