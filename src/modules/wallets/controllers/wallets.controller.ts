import { Controller, Get, Param, ParseIntPipe, Query, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Roles } from '../../../common/decorators/roles.decorator'
import { User } from '../../../common/decorators/user.decorator'
import { QueryFailedExceptionFilter } from '../../../common/exception-filters/query-failed.exception-filter'
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard'
import { RolesGuard } from '../../../common/guards/roles.guard'
import { FindAllInterceptor, FindOneInterceptor } from '../../../common/interceptors'
import { ValidationPipe } from '../../../common/validations/validation.pipe'
import { getAdminRoles, getAllRoles } from '../../users/constants/Roles'
import { QueryParamsDto } from '../dto'
import { Wallet } from '../entities/wallets.entity'
import { WalletsService } from '../services/wallets.service'

@Controller('wallets')
@ApiTags('Wallets')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@UseFilters(QueryFailedExceptionFilter)
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {
  }

  @Get()
  @Roles(getAllRoles())
  @UseInterceptors(FindAllInterceptor)
  findAll(@User() user, @Query(ValidationPipe) query: QueryParamsDto): Promise<[ Wallet[], number ]> {
    const preparedQuery = WalletsService.prepareQueryParams(query)
    return this.walletsService.findAll(user, preparedQuery)
  }

  @Get(':id')
  @Roles(getAdminRoles())
  @UseInterceptors(FindOneInterceptor)
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Wallet> {
    return this.walletsService.findById(id)
  }
}