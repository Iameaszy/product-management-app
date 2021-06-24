import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdaptersModule } from 'src/core/adapters/adapters.module';
import { CommentModule } from '../comment/Comment.module';
import { ProductController } from './Product.controller';
import { ProductSchema, Product } from './Product.schema';
import { ProductService } from './Product.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]), AdaptersModule, forwardRef(() => CommentModule)],
    controllers: [ProductController],
    providers: [ProductService],
    exports: [ProductService]
})
export class ProductModule { }
