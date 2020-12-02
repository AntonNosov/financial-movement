import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EncryptionService } from '../encryption/services/encryption.service'
import { TestNetService } from '../test-net/services/test-net.service'
import { User } from '../users/entities/users.entity'
import { UsersService } from '../users/services/users.service'
import { Wallet } from '../wallets/entities/wallets.entity'
import { WalletsService } from '../wallets/services/wallets.service'
import { TransactionsController } from './controllers/transactions.controller'
import { Transaction } from './entities/transactions.entity'
import { TransactionsService } from './services/transactions.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([ Wallet, Transaction, User ])
  ],
  controllers: [ TransactionsController ],
  providers: [ TransactionsService, UsersService, TestNetService, EncryptionService, ConfigService, WalletsService ],
  exports: [ TransactionsService ]
})

export class TransactionsModule {
}