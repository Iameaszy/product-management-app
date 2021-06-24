import { Body, Controller, Get, Param, Post, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request as ExpressRequest } from 'express';
import multer from 'multer'
import { JwtAuthGuard } from '../auth/gaurds/Jwt.guard';
import { User } from '../user/User.schema';
import { CreateProductDto } from './dtos/CreateProduct.dto';
import { Product } from './Product.schema';
import { ProductService } from './Product.service';


@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Get(":productId")
  @UseGuards(JwtAuthGuard)
  private async getProduct(@Param("productId") productId: string): Promise<Product | null> {
    return this.productService.getProduct(productId)
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  private getProducts(@Request() req: ExpressRequest): Promise<Product[]> {
    const { location: { coordinates } } = req.user as User;
    return this.productService.getProducts(coordinates)
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image', {
    storage: multer.memoryStorage()
  }))
  private async createProduct(
    @UploadedFile() file: Express.Multer.File,
    @Body() createProductDto: CreateProductDto,
    @Request() req: ExpressRequest
  ): Promise<Product> {
    console.log("req file", req.file)
    return this.productService.createProduct(file, { ...createProductDto, user: req.user as User })
  }
}
