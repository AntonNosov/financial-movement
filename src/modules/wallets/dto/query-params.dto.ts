import { ApiProperty } from '@nestjs/swagger'
import { IsOptional } from 'class-validator'
import { ListAllEntities } from '../../../common/dto/list-all-query-params.dto'

export class QueryParamsDto extends ListAllEntities {
  @ApiProperty({ description: 'Wallet archiving status', default: 'false', required: false })
  @IsOptional()
  deleted: boolean
}