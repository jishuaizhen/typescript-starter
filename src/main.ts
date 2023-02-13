import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true, // 允许跨域
  });

  app.useStaticAssets(join(__dirname, 'images'), {
    prefix: '/images',
  }); // 静态资源

  await app.listen(3000);
}
bootstrap();
