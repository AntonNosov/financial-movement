import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EncryptionService } from '../encryption/services/encryption.service'
import { UsersController } from './controllers/users.controller'
import { User } from './entities/users.entity'
import { UsersService } from './services/users.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([ User ])
  ],
  controllers: [ UsersController ],
  providers: [ UsersService, EncryptionService, ConfigService ],
  exports: [ UsersService ]
})

export class UsersModule {
}