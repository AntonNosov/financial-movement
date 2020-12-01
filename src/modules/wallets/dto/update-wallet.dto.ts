import { ApiProperty, PartialType } from '@nestjs/swagger'
import { IsBooleanString, IsOptional } from 'class-validator'
import { CreateWalletDto } from './create-wallet.dto'

export class UpdateWalletDto extends PartialType(CreateWalletDto) {
  @ApiProperty({ description: 'Wallet archiving status', required: false })
  @IsOptional()
  @IsBooleanString()
  deleted: boolean
}