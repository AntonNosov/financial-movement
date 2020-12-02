import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
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
    private readonly testNetService: TestNetService,
    private readonly config: ConfigService
  ) {
    this.transactionRepository = getCustomRepository(TransactionRepository)
  }

  async transfer(user, transferTransactionDto) {
    const walletSource = await this.walletService.findById(transferTransactionDto.walletId)
    if (!walletSource) throw new Error('Wallet is not found.')
    if (walletSource.user.id !== user.id) throw new Error('This wallet is not yours.')
    const walletDestination = await this.walletService.findByAddress(transferTransactionDto.destinationAddress)
    if (!walletSource || !walletDestination) throw new Error('Incorrect wallets.')
    const rawTransaction = {
      from: walletSource.address,
      to: transferTransactionDto.destinationAddress,
      value: transferTransactionDto.value,
      nonce: walletSource.nonce,
      gasPrice: this.config.get<number>('eth.gasPrice'),
      gasLimit: this.config.get<number>('eth.gasLimit')
    }
    await this.testNetService.sendTransaction(walletSource.privateKey, rawTransaction)
    return [ walletSource, walletDestination ]
  }

  async setBalance(walletSource, walletDestination) {
    const [ balanceSource, balanceDestination ] = await Promise.all([
      this.testNetService.getBalance(walletSource.address),
      this.testNetService.getBalance(walletDestination.address)
    ])
    // TODO: add check on success withdrawal and deposit
    await this.walletService.updateOne(walletSource.id, { balance: balanceSource, nonce: ++walletSource.nonce })
    await this.walletService.updateOne(walletDestination.id, { balance: balanceDestination })
  }
}