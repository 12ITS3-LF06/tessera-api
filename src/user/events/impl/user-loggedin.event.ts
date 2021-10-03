import { IEvent } from '@nestjs/cqrs';
import { User } from '../../user.entity';

export class UserLoggedinEvent implements IEvent {
  constructor(public readonly user: User) {}
}
