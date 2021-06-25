import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configurations';
import { EnvTypes } from './config/types';
import { ProductModule } from './core/modules/product/product.module';
import { AuthModule } from './core/modules/auth/Auth.module';
import { CommentModule } from './core/modules/comment/Comment.module';
import { UserModule } from './core/modules/user/User.module';
import { AppService } from './core/modules/app/App.service';
import { AppController } from './core/modules/app/App.controller';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, load: [configuration],
      cache: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<EnvTypes>) => ({
        uri: configService.get("dbUrl"),
        useNewUrlParser: true,
        useCreateIndex: true
      })
    }),
    ProductModule,
    AuthModule,
    CommentModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
