import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RegisterUserCommand } from '../impl/register-user.command';
import { User } from '../../user.entity';

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler
  implements ICommandHandler<RegisterUserCommand>
{
  constructor(private readonly publisher: EventPublisher) {}

  async execute(command: RegisterUserCommand) {
    const { username, password } = command.registerUserDto;

    let user = new User();
    user.isActive = true;
    user.username = username;
    user.password = password;

    user = this.publisher.mergeObjectContext(user);
    user.register();
    user.commit();
  }
}
