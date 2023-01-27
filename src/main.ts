import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.SERVER_PORT || 3000);
  Logger.log(
    `Server Running on http://localhost:${process.env.SERVER_PORT}`,
    'Bootstrap',
  );
}
bootstrap();
