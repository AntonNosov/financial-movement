import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, Length } from 'class-validator'
import { Roles } from '../constants/Roles'

export class CreateUserDto {
  @ApiProperty({ description: 'First name of user', required: true })
  @Length(1, 50)
  @IsNotEmpty()
  firstName: string

  @ApiProperty({ description: 'Last name of user', required: true })
  @Length(1, 50)
  @IsNotEmpty()
  lastName: string

  @ApiProperty({ description: 'Login of user', required: true })
  @IsNotEmpty()
  login: string

  @ApiProperty({ description: 'Email of user', required: false })
  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  email: string

  @ApiProperty({ description: 'Password of user', required: true })
  @IsNotEmpty()
  password: string

  @ApiProperty({ description: 'Role of user', required: true, enum: Roles })
  @IsEnum(Roles)
  @IsNotEmpty()
  role: Roles
}