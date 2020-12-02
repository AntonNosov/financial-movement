import { User } from '../../users/interfaces/users.interface'
import { Auth } from './auth.interface'

export interface LocalAuth extends Auth {
  login: string;
  password: string;
  firstName: string;
  lastName: string;
  user?: User;
}