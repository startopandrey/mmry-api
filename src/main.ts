import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('MMRY API')
    .setDescription('API for developers')
    .setVersion('1.0')
    .addServer('http://localhost:3000/', 'Local environment')
    .addServer('https://staging.yourapi.com/', 'Staging')
    .addServer('https://production.yourapi.com/', 'Production')
    .addTag('mmri')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
