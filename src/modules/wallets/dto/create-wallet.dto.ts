import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, Length } from 'class-validator'
import { User } from '../../users/interfaces/users.interface'

export class CreateWalletDto {
  @ApiProperty({ description: 'Name of wallet', required: true })
  @Length(1, 50)
  @IsNotEmpty()
  name: string

  @ApiProperty({ description: 'User of wallet', required: true })
  @IsNotEmpty()
  user: User
}