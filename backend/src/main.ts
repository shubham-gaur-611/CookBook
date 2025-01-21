import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use('/protected', new AuthMiddleware().use);

  // Get the absolute path to the images directory
  const imagesPath = join(__dirname, '..', 'src', 'assets', 'receipe_images');
  console.log('Serving images from:', imagesPath); // Debug log

  // Serve static files from the absolute path
  app.useStaticAssets(imagesPath, {
    prefix: '/assets/receipe_images',
  });

  // Enable CORS for frontend
  // app.enableCors({
  //   origin: 'http://localhost:5173',
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //   allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
  //   credentials: true,
  // });

  app.enableCors({
    origin: '*', // Allows all origins
    methods: '*', // Allows all specified HTTP methods
    allowedHeaders: '*', // Allows all headers
    credentials: true, // Allows credentials (cookies, Authorization headers, etc.)
  });

  await app.listen(3000);
}
bootstrap();
