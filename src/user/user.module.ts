import { Module } from '@nestjs/common';
import { RegisterUserHandler } from './commands/handlers/register-user.handler';
import { UserRegisteredHandler } from './events/handlers/user-registered.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthController } from './auth.controller';
import { UserService } from './user.service';
import { UserGateway } from './user.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

const CommandHandlers = [RegisterUserHandler];
const EventHandlers = [UserRegisteredHandler];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [UserService, UserGateway, ...CommandHandlers, ...EventHandlers],
  exports: [UserService],
})
export class UserModule {}
