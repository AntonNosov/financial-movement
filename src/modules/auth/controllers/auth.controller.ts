import { Body, Controller, Post, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { QueryFailedExceptionFilter } from '../../../common/exception-filters/query-failed.exception-filter'
import { AuthGuard } from '../../../common/guards/auth.guard'
import { ValidationPipe } from '../../../common/validations/validation.pipe'
import { LocalAuthDto } from '../dto'
import { AuthInterceptor } from '../interceptors/auth.interceptor'

@Controller('auth')
@ApiTags('Auth')
@UseFilters(QueryFailedExceptionFilter)
export class AuthController {
  @Post('local')
  @UseGuards(AuthGuard)
  @UseInterceptors(AuthInterceptor)
  authLocal(@Body(ValidationPipe) authDto: LocalAuthDto) {
    return authDto
  }
}