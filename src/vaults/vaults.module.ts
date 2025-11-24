import { Module } from '@nestjs/common';
import { VaultsService } from './vaults.service';
import { VaultsController } from './vaults.controller';
import { ConfigModule } from '@nestjs/config';
import { Vault } from './entities/vault.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Vault]), AuthModule],
  controllers: [VaultsController],
  providers: [VaultsService],
})
export class VaultsModule {}
