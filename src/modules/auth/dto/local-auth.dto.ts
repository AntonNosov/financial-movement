import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsNotEmpty } from 'class-validator'

export class LocalAuthDto {
  @ApiProperty({ description: 'User email', required: true })
  @IsDefined()
  @IsNotEmpty()
  login: string

  @ApiProperty({ description: 'User password', required: true })
  @IsDefined()
  @IsNotEmpty()
  password: string
}