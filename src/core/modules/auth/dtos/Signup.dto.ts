import { IsEmail, IsString, IsNotEmpty, IsObject, IsNotEmptyObject } from 'class-validator'
import { Address } from 'src/core/adapters/geocoding/types';

export class SignupDto {
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsObject()
    @IsNotEmptyObject()
    address: Address
}