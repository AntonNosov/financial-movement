import { NotFoundException } from '@nestjs/common'
import { EntityRepository, InsertResult, Repository } from 'typeorm'
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult'
import { User } from '../entities/users.entity'
import { User as UserInterface } from '../interfaces/users.interface'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private static updateUser(userRow: User, user: UserInterface): void {
    Object.keys(userRow).forEach(field => {
      if (typeof user[field] === 'undefined' || field === 'createdAt') return
      userRow[field] = user[field]
    })
    userRow.updatedAt = new Date()
  }

  findAll(query: any): Promise<[ User[], number ]> {
    return this.findAndCount({ ...query, order: { id: 'DESC' } })
  }

  findById(id: number): Promise<User> {
    return this.findOne(id)
  }

  findByLoginToAuth(login: string): Promise<User> {
    return this.createQueryBuilder()
      .addSelect('User.passwordHash')
      .where('User.login = :login', { login })
      .getOne()
  }

  createOne(user: UserInterface): Promise<InsertResult> {
    return this.insert(user)
  }

  async updateOne(userId: number, user: UserInterface): Promise<User> {
    const userRow = await this.findOne(userId)
    if (!userRow) throw new NotFoundException('User is not found')
    UserRepository.updateUser(userRow, user)
    return this.save(userRow)
  }

  async createOrUpdate(user: UserInterface, condition: object): Promise<User> {
    const userRow = await this.findOne(condition)
    if (!userRow) return this.save(user)
    UserRepository.updateUser(userRow, user)
    return this.save(userRow)
  }

  removeOne(userId: number): Promise<DeleteResult> {
    return this.delete(userId)
  }
}