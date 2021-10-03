import { WebSocketGateway } from '@nestjs/websockets';
import { SOCKET_PORT } from '../util/config';
import { UserService } from './user.service';
import { SocketEvent } from '../util/socket-event.decorator';
import { SocketAuth } from './auth/auth.decorator';

@WebSocketGateway(SOCKET_PORT)
export class UserGateway {
  constructor(private readonly userService: UserService) {}

  @SocketAuth()
  @SocketEvent('user.ping')
  async helloWorld(): Promise<string> {
    return 'pong';
  }
}
