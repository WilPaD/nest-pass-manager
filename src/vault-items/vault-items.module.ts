import { Module } from '@nestjs/common';
import { VaultItemsService } from './vault-items.service';
import { VaultItemsController } from './vault-items.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VaultItem } from './entities/vault-item.entity';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([VaultItem])],
  controllers: [VaultItemsController],
  providers: [VaultItemsService],
})
export class VaultItemsModule {}
