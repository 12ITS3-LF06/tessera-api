import {
  applyDecorators,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SubscribeMessage } from '@nestjs/websockets';
import { HttpExceptionTransformationFilter } from './http-exception-transformation.filter';

export const SocketEvent = (eventName: string) =>
  applyDecorators(
    UseFilters(new HttpExceptionTransformationFilter()),
    UsePipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        forbidUnknownValues: true,
      }),
    ),
    SubscribeMessage(eventName),
  );
