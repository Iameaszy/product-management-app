import { IsString, IsNotEmpty, Allow } from 'class-validator'

export class CreateCommentDto {
    @IsString()
    @IsNotEmpty()
    message: string;

    @IsString()
    @IsNotEmpty()
    product: string

    @Allow()
    parentCommentId?: any;
}