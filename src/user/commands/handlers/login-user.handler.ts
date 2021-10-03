import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { LoginUserCommand } from '../impl/login-user.command';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../user.entity';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { UserLoggedinEvent } from '../../events/impl/user-loggedin.event';
import { UserFailedLoggedinEvent } from '../../events/impl/user-failed-loggedin.event';
import { compare } from 'bcrypt';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Redis } from 'ioredis';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { ConfigService } from '@nestjs/config';
import { Config } from '../../../util/config';

@CommandHandler(LoginUserCommand)
export class LoginUserHandler implements ICommandHandler<LoginUserCommand> {
  constructor(
    private readonly eventBus: EventBus,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRedis() private readonly redis: Redis,
    private readonly configService: ConfigService<Config>,
  ) {}

  async execute(command: LoginUserCommand) {
    const { loginUserDto } = command;
    const { username, password } = loginUserDto;

    const invalidCredentialsException = new BadRequestException(
      'invalid credentials',
    );

    const user = await this.userRepository.findOne({ username: username });
    if (!user) {
      this.eventBus.publish(new UserFailedLoggedinEvent('username'));
      throw invalidCredentialsException;
    }

    if (!user.isActive) {
      this.eventBus.publish(new UserFailedLoggedinEvent('inactive', username));
      throw new BadRequestException('user is inactive');
    }

    if (!(await compare(password, user.password))) {
      this.eventBus.publish(new UserFailedLoggedinEvent('password', username));
      throw invalidCredentialsException;
    }

    const accessToken = Buffer.from(randomStringGenerator()).toString('base64');
    await this.redis.set(accessToken, user.uuid);
    await this.redis.expire(
      accessToken,
      this.configService.get('SESSION_LIFETIME_IN_MIN') * 60,
    );

    this.eventBus.publish(new UserLoggedinEvent(user));

    return accessToken;
  }
}
