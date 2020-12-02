import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseFilters,
  UseGuards,
  UseInterceptors
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { InsertResult } from 'typeorm'
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult'
import { Roles } from '../../../common/decorators/roles.decorator'
import { QueryFailedExceptionFilter } from '../../../common/exception-filters/query-failed.exception-filter'
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard'
import { RolesGuard } from '../../../common/guards/roles.guard'
import {
  CreateOneInterceptor,
  FindAllInterceptor,
  FindOneInterceptor,
  ResultInterceptor
} from '../../../common/interceptors'
import { ValidationPipe } from '../../../common/validations/validation.pipe'
import { getAdminRoles, getAllRoles } from '../../users/constants/Roles'
import { CreateWalletDto, QueryParamsDto, UpdateWalletDto } from '../dto'
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
  @Roles(getAdminRoles())
  @UseInterceptors(FindAllInterceptor)
  findAll(@Query(ValidationPipe) query: QueryParamsDto): Promise<[ Wallet[], number ]> {
    const preparedQuery = WalletsService.prepareQueryParams(query)
    return this.walletsService.findAll(preparedQuery)
  }

  @Get(':id')
  @Roles(getAdminRoles())
  @UseInterceptors(FindOneInterceptor)
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Wallet> {
    return this.walletsService.findById(id)
  }

  @Post()
  @Roles(getAllRoles())
  @UseInterceptors(CreateOneInterceptor)
  create(@Body(ValidationPipe) createWalletDto: CreateWalletDto): Promise<InsertResult> {
    return this.walletsService.createOne(createWalletDto)
  }

  @Put(':id')
  @Roles(getAllRoles())
  @UseInterceptors(FindOneInterceptor)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateWalletDto: UpdateWalletDto
  ): Promise<Wallet> {
    return this.walletsService.updateOne(id, updateWalletDto)
  }

  @Delete(':id')
  @Roles(getAllRoles())
  @UseInterceptors(ResultInterceptor)
  remove(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.walletsService.removeOne(id)
  }
}