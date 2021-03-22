import { Injectable, NestInterceptor, CallHandler, ExecutionContext, Logger } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
interface Response {
  data: any;
}
@Injectable()
export class TransformInterceptor
  implements NestInterceptor<Response> {
  intercept(context: ExecutionContext, next: CallHandler, ): Observable<Response> {
    return next.handle().pipe(map(data => {
      const action = {
        '0000': '系统异常',
        '1111': '参数错误',
        '2222': '非法操作'
      };
      const resData = {
        data,
        state: 1,
        message: '请求成功',
      };
      if (data.code && action[data.code]) {
        resData.data = null;
        resData.state = 0;
        resData.message = data.message || action[data.toString()];
      } else if (data && action[data.toString()]) {
        resData.data = null;
        resData.state = 0;
        resData.message = action[data.toString()];
      }
      return resData;
    }),
    );
  }
}
