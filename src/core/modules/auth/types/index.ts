import { Address } from 'src/core/adapters/geocoding/types';
import { User } from '../../user/User.schema';

export type Token = {
    accessToken: string;
    refreshToken: string
    expires?: string
    tokenType?: string
};
export type AuthResponse = Token & {
    user: User
};

export type JwtPayload = {
    email: string
    sub: string,
};

export type ChangePassword = {
    userId: string;
    oldPassword: string;
    newPassword: string;
};

export type SigninParams = { email: string, password: string };

export type SignupParams = {
    email: string, password: string, firstName: string, lastName: string, address: Address
};