import { Module } from '@nestjs/common';
import { VaultsService } from './vaults.service';
import { VaultsController } from './vaults.controller';
import { ConfigModule } from '@nestjs/config';
import { Vault } from './entities/vault.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Vault])],
  controllers: [VaultsController],
  providers: [VaultsService],
})
export class VaultsModule {}
