import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import ObjectId from 'src/core/common/types/ObjectId';
import { Product } from '../product/Product.schema';
import { Address } from './types/Address';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true, trim: true })
    firstName: string;

    @Prop({ required: true, trim: true })
    lastName: string;

    @Prop({ unique: true, lowercase: true, trim: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop()
    refreshToken?: string;

    @Prop(raw(Address))
    address?: Address;

    @Prop(raw({
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }))
    location: Record<string, any>

    @Prop({ type: ObjectId, ref: 'Product' })
    products?: Product[]
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ location: "2dsphere" })