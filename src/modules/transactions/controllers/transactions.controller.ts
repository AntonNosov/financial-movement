import { Body, Controller, Post, UseFilters, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { User } from '../../../common/decorators/user.decorator'
import { AllExceptionsFilter } from '../../../common/exception-filters/all-exception.filter'
import { QueryFailedExceptionFilter } from '../../../common/exception-filters/query-failed.exception-filter'
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard'
import { RolesGuard } from '../../../common/guards/roles.guard'
import { ValidationPipe } from '../../../common/validations/validation.pipe'
import { TransferTransactionDto } from '../dto/transfer-transaction.dto'
import { TransactionsService } from '../services/transactions.service'

@Controller('transactions')
@ApiTags('Transactions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@UseFilters(QueryFailedExceptionFilter)
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {
  }

  @Post('transfer')
  @UseFilters(AllExceptionsFilter)
  async transfer(@User() user, @Body(ValidationPipe) transferTransactionDto: TransferTransactionDto) {
    await this.transactionsService.transfer(user, transferTransactionDto)
    return { result: 'success' }
  }
}