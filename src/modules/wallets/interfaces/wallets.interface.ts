export interface Wallet {
  id?: number;
  name?: string;
  balance?: number;
  deleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}