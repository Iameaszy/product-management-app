import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PopulateOptions } from 'mongoose';
import { CloudinaryAdapter } from 'src/core/adapters/cloudinary';
import { Readable } from 'stream';
import { Comment } from '../comment/Comment.schema';
import { CommentService } from '../comment/Comment.service';
import { User } from '../user/User.schema';
import { Product, ProductDocument } from './Product.schema';

@Injectable()
export class ProductService {
  private commentService: CommentService

  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private cloudinaryAdapter: CloudinaryAdapter,
    private moduleRef: ModuleRef
  ) {
    this.commentService = this.moduleRef.get(CommentService, { strict: false });
  }


  public async getProduct(productId: string, populate?: PopulateOptions[]): Promise<Product | null> {

    if (populate) {
      return this.productModel.findById(productId).populate(populate).exec()
    }

    return this.productModel.findById(productId).exec();
  }

  public async createProduct(file: Express.Multer.File, product: Product): Promise<Product> {
    const { location } = product.user as User;
    const uploadResponse = await this.cloudinaryAdapter.uploadFileAsStream(() => Readable.from(file.buffer));
    return this.productModel.create({ ...product, image: uploadResponse.secure_url, location })
  }

  public async getProducts(userCoordinates: [Number]): Promise<Product[]> {
    return this.productModel.find({
      location: {
        $near: {
          $maxDistance: 1000,
          $geometry: {
            type: "Point",
            coordinates: userCoordinates
          }
        }
      }
    }).exec()
  }

  public async getProductComments(productId: string): Promise<Comment[]> {
    return this.commentService.getProductComments(productId);
  }


}
