import { IEvent } from '@nestjs/cqrs';

export class UserFailedLoggedinEvent implements IEvent {
  constructor(
    public readonly reason: string,
    public readonly username?: string,
  ) {}
}
