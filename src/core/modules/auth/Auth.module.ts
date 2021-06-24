import { Module } from '@nestjs/common';
import { AdaptersModule } from 'src/core/adapters/adapters.module';
import { UserModule } from '../user/User.module';
import { AuthController } from './Auth.controller';
import { AuthService } from './Auth.service';
import { JwtAuthGuard } from './gaurds/Jwt.guard';
import { JwtStrategy } from './strategies/Jwt.strategy';

@Module({
    imports: [UserModule, AdaptersModule],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, JwtAuthGuard],
    exports: [AuthService]
})
export class AuthModule { }
