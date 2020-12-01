import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable()
export class UserUpdateInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest()
    if (request.user.id === Number(request.params.id) && request.body.role) {
      throw new BadRequestException('You can`t change role yourself.')
    }
    if (request.user.id === Number(request.params.id) && typeof request.body.active !== 'undefined') {
      throw new BadRequestException('You can`t change status yourself.')
    }
    return next.handle().pipe(map((data) => {
      delete data.passwordHash
      return data
    }))
  }
}