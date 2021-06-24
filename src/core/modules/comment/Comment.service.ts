import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModuleRef } from '@nestjs/core';
import { Model } from 'mongoose';
import { EmailAdapter } from 'src/core/adapters/email';
import { SmsAdapter } from 'src/core/adapters/sms';
import { ProductService } from '../product/Product.service';
import { User } from '../user/User.schema';
import { Comment, CommentDocument } from './Comment.schema';

@Injectable()
export class CommentService {
  private productService: ProductService;

  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    private emailAdapter: EmailAdapter,
    private smsAdapter: SmsAdapter,
    private moduleRef: ModuleRef
  ) {
    this.productService = this.moduleRef.get(ProductService, { strict: false });
  }


  public async create(comment: Comment): Promise<Comment> {
    const newComment = await this.commentModel.create(comment)
    if (comment.parentCommentId) {
      await this.sendEmail(newComment.product as string)
      try {
        await this.sendSms(newComment.product as string)
      } catch (err) {
        console.log("unable to send sms", err);
      }
    }

    return newComment;
  }

  private async sendSms(productId: string) {
    const product = await this.productService.getProduct(productId, [{ path: "user", select: "phoneNumber" }])
    if (product && product.user && (product.user as User)?.phoneNumber) {
      return this.smsAdapter.sendSms({ to: (product?.user as User).phoneNumber!, body: `Someone replied a to a comment on your product ${product?.name}` })
    }
  }

  private async sendEmail(productId: string) {
    const product = await this.productService.getProduct(productId, [{ path: "user", select: "email" }])
    if (product && product.user && (product.user as User)?.email) {
      return this.emailAdapter.sendEmail({
        to: (product?.user as User)?.email!,
        subject: "Comment",
        text: `Someone replied to a comment on your product ${product?.name}`
      })
    }
  }


  public async getProductComments(productId: string): Promise<Comment[]> {
    return this.commentModel.find({ product: productId }).exec()
  }
}
