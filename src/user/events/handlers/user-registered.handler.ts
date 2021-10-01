import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserRegisteredEvent } from '../impl/user-registered.event';
import { Logger } from '@nestjs/common';

@EventsHandler(UserRegisteredEvent)
export class UserRegisteredHandler
  implements IEventHandler<UserRegisteredEvent>
{
  handle(event: UserRegisteredEvent): void {
    const { username } = event.user;
    Logger.log(`${username} registered!`);
  }
}
