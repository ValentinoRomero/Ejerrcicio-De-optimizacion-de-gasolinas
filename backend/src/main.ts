import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de CORS
  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  });

  // Configuración de validación global
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('EnergíaFina S.A. - API de Optimización')
    .setDescription('API para el sistema de optimización de producción de gasolinas')
    .setVersion('1.0')
    .addTag('aceites')
    .addTag('gasolinas')
    .addTag('optimizacion')
    .addTag('parametros')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`🚀 Servidor ejecutándose en http://localhost:${port}`);
  console.log(`📚 Documentación API en http://localhost:${port}/api`);
}

bootstrap(); 