import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'

@Injectable()
export class UserRemoveInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest()
    if (request.user.id === Number(request.params.id)) {
      throw new BadRequestException('You can`t delete yourself.')
    }
    return next.handle().pipe()
  }
}