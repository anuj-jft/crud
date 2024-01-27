import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerSetup } from './config/app.config';
import { EnvService } from './env/env.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('/api');
  SwaggerSetup(app, { environment: 'development' });
  const envService = app.get(EnvService);
  await app.listen(4000);
}
bootstrap();
