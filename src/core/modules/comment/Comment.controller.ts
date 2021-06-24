import { Body, Controller, Get, Post, Query, Request, UseGuards } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { JwtAuthGuard } from '../auth/gaurds/Jwt.guard';
import { UserDocument } from '../user/User.schema';
import { Comment } from './Comment.schema';
import { CommentService } from './Comment.service';
import { CreateCommentDto } from './dtos/CreateComment.dto';

@Controller("comment")
export class CommentController {
  constructor(private readonly commentService: CommentService) { }


  @Post()
  @UseGuards(JwtAuthGuard)
  private createComment(@Request() req: ExpressRequest, @Body() createCommentDto: CreateCommentDto): Promise<Comment> {
    return this.commentService.create({ ...createCommentDto, commentBy: (req.user as UserDocument).id });
  }

}
