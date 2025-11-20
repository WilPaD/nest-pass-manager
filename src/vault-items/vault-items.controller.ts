import { Controller, Get } from '@nestjs/common';
import { VaultItemsService } from './vault-items.service';

@Controller('vault-items')
export class VaultItemsController {
  constructor(private readonly vaultItemsService: VaultItemsService) {}

  @Get()
  findAll() {
    return this.vaultItemsService.show();
  }
}
