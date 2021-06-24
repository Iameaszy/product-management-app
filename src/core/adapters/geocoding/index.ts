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
        this.geocoder = nodeGeocoder({
            provider: "google",
            apiKey: config.get("geocodingApiKey"),
            formatter: null,
        });
    }

    public async geocode(address: Address) {
        const loc = await this.geocoder.geocode(address)
        return loc?.[0] || null
    }
}