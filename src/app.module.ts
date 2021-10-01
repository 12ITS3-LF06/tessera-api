import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { setupConfig } from './util/config';
import { UserModule } from './user/user.module';

@Module({
  imports: [ConfigModule.forRoot(setupConfig), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
