import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configurations';
import { EnvTypes } from './config/types';
import { ProductModule } from './core/modules/product/product.module';


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
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
