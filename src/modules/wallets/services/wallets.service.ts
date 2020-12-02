import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { getCustomRepository } from 'typeorm'
import { getAdminRoles } from '../../users/constants/Roles'
import { User } from '../../users/interfaces/users.interface'
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

  findAll(user: User = null, query: any = {}): Promise<[ Wallet[], number ]> {
    if (user && !getAdminRoles().includes(user.role)) {
      query.where.user = { id: user.id }
    }
    return this.walletRepository.findAll(query)
  }

  findById(id: number): Promise<Wallet> {
    return this.walletRepository.findById(id)
  }

  findByAddress(address: string): Promise<Wallet> {
    return this.walletRepository.findByAddress(address)
  }

  updateOne(walletId: number, wallet: WalletInterface): Promise<Wallet> {
    return this.walletRepository.updateOne(walletId, wallet)
  }
}