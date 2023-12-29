import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(express()));

  // Enable CORS
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Catalog Digitization API')
    .setDescription('API for catalog digitization')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
