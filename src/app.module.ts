import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import configuration from './config/configuration'
import { AuthModule } from './modules/auth/auth.module'
import { EncryptionModule } from './modules/encryption/encryption.module'
import { UsersModule } from './modules/users/users.module'
import { WalletsModule } from './modules/wallets/wallets.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { TestNetModule } from './modules/test-net/test-net.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ConfigModule.forRoot({
      load: [ configuration ]
    }),
    AuthModule,
    UsersModule,
    EncryptionModule,
    WalletsModule,
    TransactionsModule,
    TestNetModule
  ],
  controllers: [],
  providers: []
})

export class AppModule {
}