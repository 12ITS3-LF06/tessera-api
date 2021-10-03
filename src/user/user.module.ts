import { Module } from '@nestjs/common';
import { RegisterUserHandler } from './commands/handlers/register-user.handler';
import { UserRegisteredHandler } from './events/handlers/user-registered.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthController } from './auth/auth.controller';
import { UserService } from './user.service';
import { UserGateway } from './user.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { LoginUserHandler } from './commands/handlers/login-user.handler';
import { UserLoggedinHandler } from './events/handlers/user-loggedin.handler';
import { UserFailedLoggedinHandler } from './events/handlers/user-failed-loggedin.handler';

const CommandHandlers = [RegisterUserHandler, LoginUserHandler];
const EventHandlers = [
  UserRegisteredHandler,
  UserLoggedinHandler,
  UserFailedLoggedinHandler,
];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [UserService, UserGateway, ...CommandHandlers, ...EventHandlers],
  exports: [UserService],
})
export class UserModule {}
