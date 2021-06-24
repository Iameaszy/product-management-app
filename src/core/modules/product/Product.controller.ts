import { Body, Controller, Get, Param, Post, Req, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request as ExpressRequest } from 'express';
import { JwtAuthGuard } from '../auth/gaurds/Jwt.guard';
import { User, UserDocument } from '../user/User.schema';
import { CreateProductDto } from './dtos/CreateProduct.dto';
import { ProductDocument } from './Product.schema';
import { ProductService } from './Product.service';

@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Get(":productId")
  private async getProduct(@Param("productId") productId: string): Promise<ProductDocument | null> {
    return this.productService.getProduct(productId)
  }

  @UseGuards(JwtAuthGuard)
  @Get("/")
  private getProducts(@Request() req: ExpressRequest): Promise<ProductDocument[]> {
    const { location: { coordinates } } = req.user as User;
    return this.productService.getProducts(coordinates)
  }

  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  private async createProduct(
    @UploadedFile() file: Express.Multer.File,
    @Body() createProductDto: CreateProductDto,
    @Request() req: ExpressRequest
  ): Promise<ProductDocument> {
    return this.productService.createProduct(file, { ...createProductDto, user: (req.user as UserDocument).id })
  }
}
