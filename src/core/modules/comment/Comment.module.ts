import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdaptersModule } from 'src/core/adapters/adapters.module';
import { ProductModule } from '../product/product.module';
import { CommentController } from './Comment.controller';
import { CommentSchema, Comment } from './Comment.schema';
import { CommentService } from './Comment.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]), forwardRef(() => ProductModule), AdaptersModule],
    controllers: [CommentController],
    providers: [CommentService],
    exports: [CommentService]
})
export class CommentModule { }
