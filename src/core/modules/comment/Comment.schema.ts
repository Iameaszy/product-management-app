import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import ObjectId from 'src/core/common/types/ObjectId';
import { Product } from '../product/Product.schema';
import { User } from '../user/User.schema';

export type CommentDocument = typeof Comment & Document;


@Schema({ timestamps: true })
export class Comment {
    @Prop()
    message: string;

    @Prop({ type: ObjectId, ref: 'User' })
    commentBy: User

    @Prop({ type: ObjectId, ref: 'Product' })
    product: Product

    @Prop({ type: ObjectId, ref: 'Comment', required: false })
    parentCommentId: Comment
}

export const CommentSchema = SchemaFactory.createForClass(Comment);