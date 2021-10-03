import { ArgumentsHost, Catch, HttpException, Logger } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';

@Catch(HttpException)
export class HttpExceptionTransformationFilter extends BaseWsExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const cb = host.getArgByIndex(2);
    if (cb && typeof cb === 'function') {
      cb(exception);
    } else {
      super.catch(new WsException(exception.getResponse()), host);
      Logger.warn('http exception was emitted without acknowledgement');
    }
  }
}
