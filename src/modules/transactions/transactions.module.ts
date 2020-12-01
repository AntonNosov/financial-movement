import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Wallet } from '../wallets/entities/wallets.entity'
import { TransactionsController } from './controllers/transactions.controller'
import { Transaction } from './entities/transactions.entity'
import { TransactionsService } from './services/transactions.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([ Wallet, Transaction ])
  ],
  controllers: [ TransactionsController ],
  providers: [ TransactionsService ],
  exports: [ TransactionsService ]
})

export class TransactionsModule {
}