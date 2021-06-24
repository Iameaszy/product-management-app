import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import ObjectId from 'src/core/common/types/ObjectId';
import { User } from '../user/User.schema';

export type ProductDocument = typeof Product & Document;


@Schema({ timestamps: true })
export class Product {
    @Prop({ unique: true, trim: true })
    name: string;

    @Prop()
    image?: string;

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
    location?: Record<string, any>


    @Prop({ type: ObjectId, ref: 'User' })
    user: User | string
}

export const ProductSchema = SchemaFactory.createForClass(Product);