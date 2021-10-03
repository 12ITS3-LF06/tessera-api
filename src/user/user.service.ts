import { CommandBus } from '@nestjs/cqrs';
import { LoginUserDto, RegisterUserDto } from './user.dto';
import { RegisterUserCommand } from './commands/impl/register-user.command';
import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginUserCommand } from './commands/impl/login-user.command';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    private readonly commandBus: CommandBus,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  registerUser(registerUserDto: RegisterUserDto) {
    return this.commandBus.execute(new RegisterUserCommand(registerUserDto));
  }

  loginUser(loginUserDto: LoginUserDto) {
    return this.commandBus.execute(new LoginUserCommand(loginUserDto));
  }

  async getByUuid(uuid: string): Promise<User> {
    const user = this.userRepository.findOne({ uuid: uuid });
    if (!user) throw new NotFoundException(uuid);
    return user;
  }
}
