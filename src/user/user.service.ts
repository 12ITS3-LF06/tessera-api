import { CommandBus } from '@nestjs/cqrs';
import { RegisterUserDto } from './user.dto';
import { RegisterUserCommand } from './commands/impl/register-user.command';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private readonly commandBus: CommandBus) {}

  registerUser(registerUserDto: RegisterUserDto) {
    return this.commandBus.execute(new RegisterUserCommand(registerUserDto));
  }
}
