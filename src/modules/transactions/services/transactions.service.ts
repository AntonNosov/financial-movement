import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { getCustomRepository } from 'typeorm'
import { TransactionRepository } from '../repositories/transaction.repository'

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(TransactionRepository)
    private readonly transactionRepository: TransactionRepository
  ) {
    this.transactionRepository = getCustomRepository(TransactionRepository)
  }


}