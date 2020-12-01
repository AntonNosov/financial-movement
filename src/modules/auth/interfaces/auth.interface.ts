import { User } from '../../users/entities/users.entity'

export interface Auth {
  init(authData: object): void;

  getUser(): Promise<User>;
}