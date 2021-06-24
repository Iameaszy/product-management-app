import { Body, Controller, Headers, Post } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './Auth.service';
import { SigninDto } from './dtos/SignIn.dto';
import { SignupDto } from './dtos/Signup.dto';
import { AuthResponse } from './types';

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post(["signin", "login"])
  private login(@Body() signinDto: SigninDto): Promise<AuthResponse> {
    return this.authService.signin(signinDto);
  }

  @Post(["signup", "register"])
  private signup(@Body() signupDto: SignupDto): Promise<AuthResponse> {
    return this.authService.signup(signupDto);
  }

  @Post("refresh-token")
  private refreshToken(@Headers("authorization") authorizationHeader: string, request: Request, @Body() { refreshToken }: { refreshToken: string }) {
    const accessToken = this.authService.extractToken(authorizationHeader);
    return this.authService.refreshToken({ refreshToken, accessToken });
  }
}
