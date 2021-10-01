import { ICommand } from '@nestjs/cqrs';
import { RegisterUserDto } from '../../user.dto';

export class RegisterUserCommand implements ICommand {
  constructor(public readonly registerUserDto: RegisterUserDto) {}
}
