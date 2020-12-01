import { ApiProperty, PartialType } from '@nestjs/swagger'
import { IsBooleanString, IsOptional } from 'class-validator'
import { CreateUserDto } from './create-user.dto'

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ description: 'User archiving status', required: false })
  @IsOptional()
  @IsBooleanString()
  deleted: boolean
}