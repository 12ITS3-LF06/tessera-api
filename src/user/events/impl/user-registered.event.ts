import { IEvent } from '@nestjs/cqrs';
import { User } from '../../user.entity';

export class UserRegisteredEvent implements IEvent {
  constructor(public readonly user: User) {}
}
