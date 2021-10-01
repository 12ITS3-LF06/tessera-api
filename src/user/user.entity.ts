import { AggregateRoot } from '@nestjs/cqrs';
import { UserRegisteredEvent } from './events/impl/user-registered.event';

export class User extends AggregateRoot {
  isActive: boolean;
  username: string;
  password: string;

  register() {
    this.apply(new UserRegisteredEvent(this));
  }
}
