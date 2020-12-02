import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Wallet } from '../wallets/entities/wallets.entity'
import { WalletsService } from '../wallets/services/wallets.service'
import { TestNetService } from './services/test-net.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([ Wallet ])
  ],
  providers: [ TestNetService, WalletsService ],
  exports: [ TestNetService ]
})
export class TestNetModule {
}
