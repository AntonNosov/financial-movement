import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class TransferTransactionDto {
  @ApiProperty({ description: 'Id of wallet', required: true })
  @IsNotEmpty()
  walletId: number

  @ApiProperty({ description: 'Value of transaction', required: true })
  @IsNotEmpty()
  value: number

  @ApiProperty({ description: 'Destination address', required: true })
  @IsNotEmpty()
  destinationAddress: string
}