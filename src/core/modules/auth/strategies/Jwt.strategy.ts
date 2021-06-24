import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { JwtPayload } from '../types';
import { AuthService } from '../Auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private authService: AuthService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.SECRET_KEY
        });
    }

    private async validate(payload: JwtPayload) {
        const id = payload?.sub;
        if (!id) throw new UnauthorizedException('Unauthorized');

        const user = await this.authService.findUser(id);
        if (!user) throw new UnauthorizedException('Unauthorized');
        return user;
    }
}