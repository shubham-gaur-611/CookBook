import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Get the absolute path to the images directory
  const imagesPath = join(__dirname, '..', 'src', 'assets', 'receipe_images');
 
  app.useStaticAssets(imagesPath, {
    prefix: '/assets/receipe_images',
  });

  app.enableCors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
    credentials: true,
  });

  // app.enableCors({
  //   origin: '*', // Allows all origins
  //   methods: '*', // Allows all specified HTTP methods
  //   allowedHeaders: '*', // Allows all headers
  //   credentials: true, // Allows credentials (cookies, Authorization headers, etc.)
  // });

  await app.listen(3000);
}
bootstrap();
