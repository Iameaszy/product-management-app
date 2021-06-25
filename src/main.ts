import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import hbs from 'hbs';
import { AppModule } from './app.module';
import config from './config/configurations';

async function bootstrap() {
  const { port } = config();
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  app.useStaticAssets(join(__dirname, 'public'));
  app.setBaseViewsDir(join(__dirname, 'views'));
  hbs.registerPartials(join(__dirname, 'views/partials'));
  app.setViewEngine('hbs');
  app.set("view options", { layout: 'layouts/main' })

  await app.listen(port, () => {
    console.log(`Nest app listening on port ${port}`);
  });
}
bootstrap();
