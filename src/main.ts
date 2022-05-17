import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('API')
      .setDescription('Description')
      .setVersion('1.0')
      .addBearerAuth(
        {
          type: 'http',
          name: 'Authorization',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
        'authorization',
      )
      .build(),
  );
  SwaggerModule.setup('/docs', app, document);
  await app.listen(8888);
}
bootstrap();
