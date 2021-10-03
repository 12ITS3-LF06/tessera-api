import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserLoggedinEvent } from '../impl/user-loggedin.event';
import { Logger } from '@nestjs/common';

@EventsHandler(UserLoggedinEvent)
export class UserLoggedinHandler implements IEventHandler<UserLoggedinEvent> {
  handle(event: UserLoggedinEvent): void {
    const { username } = event.user;
    Logger.log(`${username} logged in!`);
  }
}
