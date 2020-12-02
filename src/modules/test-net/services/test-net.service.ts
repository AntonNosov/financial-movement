import { Injectable } from '@nestjs/common'
import EthCrypto from 'eth-crypto'
import ganache from 'ganache-cli'
import Web3 from 'web3'
import { WalletsService } from '../../wallets/services/wallets.service'

@Injectable()
export class TestNetService {
  private web3

  constructor(private readonly walletsService: WalletsService) {
    this.web3 = new Web3()
    this.setAccounts()
  }

  async setAccounts() {
    const [ accounts ] = await this.walletsService.findAll()
    const ganacheProvider = ganache.provider({
      accounts: accounts.map(account => ({
        secretKey: account.privateKey,
        balance: account.balance
      }))
    })
    this.web3.setProvider(ganacheProvider)
  }

  getBalance(address) {
    return this.web3.eth.getBalance(address)
  }

  sendTransaction(privateKey, rawTransaction) {
    const serializedTx = EthCrypto.signTransaction(rawTransaction, privateKey)
    return this.web3.eth.sendSignedTransaction(serializedTx)
  }
}