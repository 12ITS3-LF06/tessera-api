import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Config } from '../util/config';
import { Environment } from '../util/environment.enum';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<Config>) => ({
        type: 'mariadb',
        timezone: 'Z',
        host: configService.get('MARIADB_HOST'),
        port: configService.get('MARIADB_PORT'),
        database: configService.get('MARIADB_NAME'),
        username: configService.get('MARIADB_USER'),
        password: configService.get('MARIADB_PASS'),
        entities: [__dirname + '/../**/*.entity{.js,.ts}'],
        synchronize: configService.get('NODE_ENV') === Environment.DEVELOPMENT,
      }),
    }),
  ],
})
export class DatabaseModule {}
