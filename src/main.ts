import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Config } from './util/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService<Config> = app.get(ConfigService);

  await app.listen(configService.get('PORT'));
  Logger.log(`listen on port ${configService.get('PORT')}`);
}

bootstrap();
