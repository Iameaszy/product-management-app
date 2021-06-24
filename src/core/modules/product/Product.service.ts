import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './Product.schema';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) { }


  public async getProduct(productId: string) {
    return this.productModel.findById(productId).exec()
  }

  public async createProduct(file: Express.Multer.File, product: Product) {
    return this.productModel.create(product)
  }

  public async getProducts(userCoordinates: [Number]) {
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


}
