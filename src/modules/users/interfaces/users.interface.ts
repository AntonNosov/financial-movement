import { Roles } from '../constants/Roles'

export interface User {
  id?: number;
  firstName?: string;
  lastName?: string;
  login?: string;
  email?: string;
  password?: string;
  passwordHash?: string;
  role?: Roles;
  deleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}