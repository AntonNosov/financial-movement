import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn
} from 'typeorm'
import { User } from '../../users/entities/users.entity'

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 50 })
  name: string

  @Column({ default: 0 })
  balance: number

  @Column()
  @Unique([ 'address' ])
  address: string

  @Column()
  privateKey: string

  @Column()
  publicKey: string

  @Column()
  nonce: number

  @Column({ default: false })
  deleted: boolean

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date

  @ManyToOne(
    () => User,
    user => user.wallets
  )
  @JoinColumn()
  user: User
}