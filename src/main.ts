import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common/services/logger.service';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Medium Clone API')
    .setDescription('The Medium Clone API description')
    .setVersion('1.0')
    .addTag('medium-clone')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, swaggerDocument);

  await app.listen(3000);

  Logger.debug(`Application is running on: http://0.0.0.0:3000`);
  Logger.debug(`Swagger is running on: http://0.0.0.0:3000/api`,);
}
bootstrap();
