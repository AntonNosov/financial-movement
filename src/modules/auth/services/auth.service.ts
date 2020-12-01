import { Injectable } from '@nestjs/common'
import { User } from '../../users/interfaces/users.interface'
import { AuthServices, AuthType } from '../constants/auth.constants'
import { LocalAuth } from '../interfaces/local-auth.interface'
import { JwtStrategy } from '../strategies/jwt.strategy'
import { LocalStrategy } from '../strategies/local.strategy'

@Injectable()
export class AuthService {
  constructor(
    private readonly localStrategy: LocalStrategy,
    private readonly jwtStrategy: JwtStrategy
  ) {
  }

  get strategy(): object {
    return {
      [AuthServices.LOCAL]: this.localStrategy
    }
  }

  async validateRequest(authData: LocalAuth, service: AuthType): Promise<boolean> {
    await this.strategy[service].init(authData)
    const user = await this.strategy[service].getUser()
    delete user.passwordHash
    authData.user = user
    return !!user
  }

  async register(authData: LocalAuth, service: AuthType): Promise<User> {
    await this.strategy[service].init(authData)
    const user = await this.strategy[service].createOrUpdateUser()
    delete user.passwordHash
    return user
  }

  createUserToken(user: User): string {
    return this.jwtStrategy.createToken({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      login: user.login
    })
  }
}