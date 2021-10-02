import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RegisterUserCommand } from '../impl/register-user.command';
import { User } from '../../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { hash } from 'bcrypt';

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler
  implements ICommandHandler<RegisterUserCommand>
{
  constructor(
    private readonly publisher: EventPublisher,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async execute(command: RegisterUserCommand) {
    const { registerUserDto } = command;
    const { password } = registerUserDto;

    let user = this.userRepository.create(registerUserDto);
    user.password = await hash(password, 10);
    try {
      await this.userRepository.save(user);
    } catch (exception) {
      if (exception?.errno === 1062)
        throw new BadRequestException('username is already in use');
    }

    user = this.publisher.mergeObjectContext(user);
    user.register();
    user.commit();
  }
}
