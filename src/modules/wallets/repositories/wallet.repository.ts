import { NotFoundException } from '@nestjs/common'
import { EntityRepository, Repository } from 'typeorm'
import { Wallet } from '../entities/wallets.entity'
import { Wallet as WalletInterface } from '../interfaces/wallets.interface'

@EntityRepository(Wallet)
export class WalletRepository extends Repository<Wallet> {
  private static updateWallet(userRow: Wallet, user: WalletInterface): void {
    Object.keys(userRow).forEach(field => {
      if (typeof user[field] === 'undefined' || field === 'createdAt') return
      userRow[field] = user[field]
    })
    userRow.updatedAt = new Date()
  }

  findAll(query: any): Promise<[ Wallet[], number ]> {
    return this.findAndCount({ ...query, order: { id: 'DESC' } })
  }

  findById(id: number): Promise<Wallet> {
    return this.findOne(id, { relations: [ 'user' ] })
  }

  findByAddress(address: string): Promise<Wallet> {
    return this.findOne({ address })
  }

  async updateOne(walletId: number, wallet: WalletInterface): Promise<Wallet> {
    const walletRow = await this.findOne(walletId)
    if (!walletRow) throw new NotFoundException('Wallet is not found')
    WalletRepository.updateWallet(walletRow, wallet)
    return this.save(walletRow)
  }
}