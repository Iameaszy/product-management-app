import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { SKIP_AUTH } from '../constants';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') { }