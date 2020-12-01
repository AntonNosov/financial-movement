import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, getCustomRepository, InsertResult } from 'typeorm'
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult'
import { WalletQueryParams } from '../constants/QueryParams'
import { Wallet } from '../entities/wallets.entity'
import { Wallet as WalletInterface } from '../interfaces/wallets.interface'
import { WalletRepository } from '../repositories/wallet.repository'

@Injectable()
export class WalletsService {
  constructor(
    @InjectRepository(WalletRepository)
    private readonly walletRepository: WalletRepository
  ) {
    this.walletRepository = getCustomRepository(WalletRepository)
  }

  static prepareQueryParams(queryParams: any) {
    const where = {}
    Object.keys(queryParams).forEach(param => {
      if (!WalletQueryParams.includes(param)) return
      where[param] = queryParams[param]
    })
    return { ...queryParams, where }
  }

  findAll(query: FindManyOptions<Wallet>): Promise<[ Wallet[], number ]> {
    return this.walletRepository.findAll(query)
  }

  findById(id: number): Promise<Wallet> {
    return this.walletRepository.findById(id)
  }

  async createOne(wallet: WalletInterface): Promise<InsertResult> {
    return this.walletRepository.createOne(wallet)
  }

  async updateOne(walletId: number, wallet: WalletInterface): Promise<Wallet> {
    return this.walletRepository.updateOne(walletId, wallet)
  }

  createOrUpdate(wallet: WalletInterface, condition: object): Promise<Wallet> {
    return this.walletRepository.createOrUpdate(wallet, condition)
  }

  removeOne(id: number): Promise<DeleteResult> {
    return this.walletRepository.removeOne(id)
  }
}