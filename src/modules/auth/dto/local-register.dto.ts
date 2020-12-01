import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, MaxLength } from 'class-validator'

export class LocalRegisterDto {
  @ApiProperty({ description: 'User first name', required: true })
  @MaxLength(50, { message: 'First name is too long' })
  @IsNotEmpty({ message: 'First name is required' })
  firstName: string

  @ApiProperty({ description: 'User last name', required: true })
  @MaxLength(50, { message: 'Last name is too long' })
  @IsNotEmpty({ message: 'Last name is required' })
  lastName: string

  @ApiProperty({ description: 'User login', required: true })
  @MaxLength(50, { message: 'Login is too long' })
  @IsNotEmpty({ message: 'Login is required' })
  login: string

  @ApiProperty({ description: 'User password', required: true })
  @IsNotEmpty({ message: 'Password is required' })
  password: string
}