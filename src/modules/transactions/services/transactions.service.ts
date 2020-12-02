import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { getCustomRepository } from 'typeorm'
import { TestNetService } from '../../test-net/services/test-net.service'
import { WalletsService } from '../../wallets/services/wallets.service'
import { TransactionRepository } from '../repositories/transaction.repository'

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(TransactionRepository)
    private readonly transactionRepository: TransactionRepository,
    private readonly walletService: WalletsService,
    private readonly testNetService: TestNetService
  ) {
    this.transactionRepository = getCustomRepository(TransactionRepository)
  }

  async transfer(user, transferTransactionDto) {
    const walletSource = await this.walletService.findById(transferTransactionDto.walletId)
    const walletDestination = await this.walletService.findByAddress(transferTransactionDto.destinationAddress)
    if (!walletSource || !walletDestination) throw new Error('Incorrect wallets.')
    const rawTransaction = {
      from: walletSource.address,
      to: transferTransactionDto.destinationAddress,
      value: transferTransactionDto.value,
      nonce: walletSource.nonce,
      gasPrice: 0.00000071, // 1.5%
      gasLimit: 21000
    }
    await this.testNetService.sendTransaction(walletSource.privateKey, rawTransaction)
    const balanceSource = await this.testNetService.getBalance(walletSource.address)
    const balanceDestination = await this.testNetService.getBalance(transferTransactionDto.destinationAddress)
    await this.walletService.updateOne(walletSource.id, { balance: balanceSource, nonce: ++walletSource.nonce })
    await this.walletService.updateOne(walletDestination.id, { balance: balanceDestination })
  }
}