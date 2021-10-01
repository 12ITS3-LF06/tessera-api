import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { setupConfig } from './util/config';

@Module({
  imports: [ConfigModule.forRoot(setupConfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
