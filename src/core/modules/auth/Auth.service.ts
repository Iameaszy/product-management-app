import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { GeocodingAdapter } from 'src/core/adapters/geocoding';
import { UserDocument } from '../user/User.schema';
import { UserService } from '../user/User.service';
import { ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY, TOKEN_EXPIRATION_TIME } from './constants';
import { AuthResponse, JwtPayload, SigninParams, SignupParams, Token } from './types';


@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private geocodingAdapter: GeocodingAdapter
  ) { }

  public async findUser(id: string): Promise<UserDocument | null> {
    return this.userService.findUserById(id);
  }

  private async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  private async validateUserDoesNotExist(email: string) {
    const user = await this.userService.findUserByEmail(email);

    if (user) {
      throw new ConflictException('User already exist');
    }
  }

  public async signup({ email, password, address, ...rest }: SignupParams): Promise<AuthResponse> {
    await this.validateUserDoesNotExist(email);

    const location = await this.geocodingAdapter.geocode(address);

    if (!(location && location.latitude && location.longitude)) throw new BadRequestException("Address location not found");

    const hashedPassword = await this.hashPassword(password);

    const user = await this.userService.createUser({ ...rest, email, password: hashedPassword, location: { type: "Point", coordinates: [location.longitude, location.latitude] } });

    const token = await this.generateToken(user);

    return this.saveRefreshToken(user.id, token)
  }

  public async refreshToken({ refreshToken, accessToken }: Token) {
    const { sub } = this.jwtService.verify<JwtPayload>(accessToken, { ignoreExpiration: true });

    const refreshPayload = this.jwtService.verify<JwtPayload>(refreshToken);

    const accessTokenUser = await this.userService.findUserById(sub);

    const refreshTokenUser = await this.userService.findUserById(refreshPayload.sub);

    if (!(accessTokenUser && refreshTokenUser)) {
      throw new UnauthorizedException('Invalid access/refreh token');
    }

    if (refreshToken !== refreshTokenUser.refreshToken) {
      throw new UnauthorizedException('Invalid refreh token');
    }

    return this.generateToken(refreshTokenUser);
  }

  public async signin({ email, password }: SigninParams): Promise<AuthResponse> {
    const user = await this.userService.findUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User does not exist');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedException('email/password is incorrect');
    }

    const token = await this.generateToken(user);

    return this.saveRefreshToken(user.id, token)
  }

  private async saveRefreshToken(userId: string, { refreshToken, ...rest }: Token): Promise<AuthResponse> {
    const user = await this.userService.updateUser(userId, { refreshToken });


    return {
      ...rest,
      refreshToken,
      user: user!,
    };
  }

  private async generateToken({ id: userId, email }: UserDocument): Promise<Token> {
    const payload: JwtPayload = { email, sub: userId };

    const accessToken = this.jwtService.sign(payload, { expiresIn: ACCESS_TOKEN_EXPIRY });

    const refreshToken = this.jwtService.sign(payload, { expiresIn: REFRESH_TOKEN_EXPIRY });

    return {
      accessToken,
      refreshToken,
      tokenType: 'bearer',
      expires: TOKEN_EXPIRATION_TIME,
    };
  }

  public extractToken(authorizationHeader: string) {
    if (!authorizationHeader) {
      throw new UnauthorizedException('Unauthorized');
    }
    const [tokenType, token] = authorizationHeader.split(' ');
    if (!(tokenType && token && /bearer/i.test(tokenType))) {
      throw new UnauthorizedException('JWT Malformed');
    }

    return token.trim();
  }


}
