import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, Length } from 'class-validator'

export class CreateWalletDto {
  @ApiProperty({ description: 'Name of wallet', required: true })
  @Length(1, 50)
  @IsNotEmpty()
  name: string
}