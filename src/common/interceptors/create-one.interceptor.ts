import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

export interface Response<T> {
  item?: object;
  status?: string;
  message?: string;
}

@Injectable()
export class CreateOneInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(map((data) => {
      return data?.raw?.length
        ? { item: data?.raw[0] }
        : { status: 'error', message: 'Count of affected rows are null.' }
    }))
  }
}