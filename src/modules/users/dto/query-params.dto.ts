import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsOptional } from 'class-validator'
import { ListAllEntities } from '../../../common/dto/list-all-query-params.dto'
import { Roles } from '../constants/Roles'

export class QueryParamsDto extends ListAllEntities {
  @ApiProperty({ description: 'Status of user', default: 'false', required: false })
  @IsOptional()
  deleted: boolean

  @ApiProperty({
    description: 'User role',
    required: false,
    enum: Roles
  })
  @IsOptional()
  @IsEnum(Roles)
  role: Roles
}