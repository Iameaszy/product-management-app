import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AdaptersModule } from 'src/core/adapters/adapters.module';
import { EnvTypes } from 'src/config/types';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from '../user/User.module';
import { AuthController } from './Auth.controller';
import { AuthService } from './Auth.service';
import { JwtAuthGuard } from './gaurds/Jwt.guard';
import { JwtStrategy } from './strategies/Jwt.strategy';


@Module({
    imports: [PassportModule.register({ session: false }),
    JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService<EnvTypes>) => ({
            secret: configService.get("secretKey")
        })
    }), UserModule, AdaptersModule],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, JwtAuthGuard],
    exports: [AuthService]
})
export class AuthModule { }
