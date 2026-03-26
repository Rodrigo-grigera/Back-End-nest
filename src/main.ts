import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    forbidNonWhitelisted : true})) //esto es para que  se respete el dto con propiedades y decoradores
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
