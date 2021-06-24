import { IsString, IsNotEmpty, Allow } from 'class-validator'

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @Allow()
    image: any;
}