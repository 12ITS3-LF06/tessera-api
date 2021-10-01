import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { SOCKET_PORT } from '../util/config';
import { UserService } from './user.service';

@WebSocketGateway(SOCKET_PORT)
export class UserGateway {
  constructor(private readonly userService: UserService) {}

  @SubscribeMessage('user.ping')
  async helloWorld(): Promise<string> {
    return 'pong';
  }
}
