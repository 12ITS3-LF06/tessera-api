import { applyDecorators, UseGuards } from '@nestjs/common';
import { SocketAuthGuard } from './socket-auth.guard';

export const SocketAuth = () => applyDecorators(UseGuards(SocketAuthGuard));
