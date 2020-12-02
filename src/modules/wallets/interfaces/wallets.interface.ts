import { User } from '../../users/interfaces/users.interface'

export interface Wallet {
  id?: number;
  name?: string;
  balance?: number;
  address?: string;
  privateKey?: string;
  publicKey?: string;
  nonce?: number;
  deleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  user?: User;
}