import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { SKIP_AUTH } from '../constants';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext) {
        const skipAuth = this.reflector.getAllAndOverride<boolean>(SKIP_AUTH, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (skipAuth) {
            return true;
        }
        return super.canActivate(context);
    }

    handleRequest(err: Error, user: any, info: any) {
        if (err || !user) {
            throw err || new UnauthorizedException(info?.message ?? 'Unauthorized');
        }
        return user;
    }
}
