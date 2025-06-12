import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: 'http://localhost:5173', // ajuste conforme porta do seu frontend React
    credentials: true,
  });

  // Swagger - documentação da API
  const config = new DocumentBuilder()
    .setTitle('User Management API')
    .setDescription('API para autenticação e gerenciamento de usuários')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Inicia o servidor
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
