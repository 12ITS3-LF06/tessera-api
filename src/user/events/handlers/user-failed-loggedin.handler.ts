import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserFailedLoggedinEvent } from '../impl/user-failed-loggedin.event';
import { Logger } from '@nestjs/common';

@EventsHandler(UserFailedLoggedinEvent)
export class UserFailedLoggedinHandler
  implements IEventHandler<UserFailedLoggedinEvent>
{
  handle(event: UserFailedLoggedinEvent): void {
    const { reason, username } = event;
    let msg = 'invalid login';
    if (username) msg += ` of user ${username}`;
    msg += `, reason: ${reason}`;
    Logger.log(msg);
  }
}
