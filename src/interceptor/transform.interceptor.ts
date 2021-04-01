import { Injectable, NestInterceptor, CallHandler, ExecutionContext, Logger } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
interface Response {
  data: any;
}
@Injectable()
export class TransformInterceptor
  implements NestInterceptor<Response> {
  intercept(context: ExecutionContext, next: CallHandler,): Observable<Response> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    return next.handle().pipe(map(responseData => {
      // console.log(responseData);
      const action = {
        '0000': '系统异常',
        '1111': '参数错误',
        '2222': '非法操作',
        '3333': '操作失败',
      };
      const resData = {
        data: responseData,
        state: 1,
        message: '请求成功',
      };
      if (Object.prototype.toString.call(responseData) === '[object Object]') {
        if(responseData.code && action[responseData.code]) {
          resData.data = null;
          resData.state = 0;
          resData.message = responseData.message || action[responseData.code];
        }
        if (responseData.data) {
          resData.data = responseData.data;
          resData.message = responseData.message || '请求成功';
        }
      }
      return resData;
    }),
    );
  }
}
