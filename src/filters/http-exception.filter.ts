import { ArgumentsHost, Catch,  ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const message = exception.message;
    Logger.log('错误请求', JSON.stringify(message));
    const errorResponse = {
      data: message, // 获取全部的错误信息
      message: '请求失败',
      state: 0, // 自定义code
      url: request.originalUrl, // 错误的url地址
    };
    if (message.statusCode === 401) {
      delete errorResponse.data;
      errorResponse.message = '身份认证失败';
      errorResponse.state = 9;
    }
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    // 设置返回的状态码、请求头、发送错误信息
    response.status(status);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}