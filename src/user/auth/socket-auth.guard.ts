import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Redis } from 'ioredis';
import { Reflector } from '@nestjs/core';
import { WsException } from '@nestjs/websockets';
import { UserService } from '../user.service';

@Injectable()
export class SocketAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectRedis() private readonly redis: Redis,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const socket = context.switchToWs().getClient<Socket>();
    const accessToken = socket.handshake.headers.authorization;

    if (!accessToken) throw new WsException('provide a authorization header');

    const userUuid = await this.redis.get(accessToken);
    if (!userUuid) throw new WsException('expired accessToken');

    const user = await this.userService.getByUuid(userUuid);
    if (!user) throw new WsException('cannot find user for accessToken');

    if (!user.isActive) {
      await this.redis.del(accessToken);
      throw new WsException('user is inactive');
    }

    return true;
  }
}
