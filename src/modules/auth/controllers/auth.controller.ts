import { Body, Controller, Post, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { QueryFailedExceptionFilter } from '../../../common/exception-filters/query-failed.exception-filter'
import { AuthGuard } from '../../../common/guards/auth.guard'
import { ValidationPipe } from '../../../common/validations/validation.pipe'
import { LocalAuthDto } from '../dto'
import { AuthInterceptor } from '../interceptors/auth.interceptor'

@Controller()
@ApiTags('Auth')
@UseFilters(QueryFailedExceptionFilter)
export class AuthController {
  @Post('v1/auth/local')
  @UseGuards(AuthGuard)
  @UseInterceptors(AuthInterceptor)
  authLocal(@Body(ValidationPipe) authDto: LocalAuthDto) {
    return authDto
  }

  @Post('v1/auth/local/register')
  @UseInterceptors(ResultInterceptor)
  registerLocal(@Body(ValidationPipe) localRegister: LocalRegisterDto): Promise<User> {
    return this.authService.register(localRegister, AuthServices.LOCAL)
  }
}