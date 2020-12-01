import { CallHandler, ExecutionContext, ForbiddenException, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { AuthService } from '../services/auth.service'

export interface Response<T> {
  token: string;
  user: object;
}

@Injectable()
export class AuthInterceptor<T> implements NestInterceptor<T, Response<T>> {
  constructor(private readonly authService: AuthService) {
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map(() => {
        const request = context.switchToHttp().getRequest()
        if (request.body.user?.isDeleted) throw new ForbiddenException('User is not active.')
        return { token: this.authService.createUserToken(request.body.user), user: request.body.user }
      })
    )
  }
}