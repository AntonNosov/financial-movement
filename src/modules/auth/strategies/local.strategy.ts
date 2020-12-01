import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common'
import { EncryptionService } from '../../encryption/services/encryption.service'
import { User } from '../../users/entities/users.entity'
import { User as UserInterface } from '../../users/interfaces/users.interface'
import { UsersService } from '../../users/services/users.service'
import { LocalAuth } from '../interfaces/local-auth.interface'

@Injectable()
export class LocalStrategy implements LocalAuth {
  login: string
  password: string
  firstName: string
  lastName: string

  constructor(
    private readonly usersService: UsersService,
    private readonly encryptionService: EncryptionService
  ) {
  }

  init({ login, password, firstName, lastName }): void {
    this.login = login
    this.password = password
    this.firstName = firstName
    this.lastName = lastName
  }

  async getUser(): Promise<User> {
    const user = await this.usersService.findByLoginToAuth(this.login)
    if (!user) throw new NotFoundException('User is not found.')
    await this.verifyUser(user.passwordHash)
    return user
  }

  async createOrUpdateUser(): Promise<User> {
    const preparedUser = await this.getPreparedUser()
    return this.usersService.createOrUpdate(preparedUser, { login: preparedUser.login })
  }

  async verifyUser(passwordHash: string): Promise<void> {
    const isVerifiedPassword = await this.encryptionService.compare(this.password, passwordHash)
    if (!isVerifiedPassword) throw new UnprocessableEntityException('Incorrect access data.')
  }

  private async getPreparedUser(): Promise<UserInterface> {
    const passwordHash = await this.encryptionService.hash(this.password)
    return { login: this.login, passwordHash, firstName: this.firstName, lastName: this.lastName }
  }
}