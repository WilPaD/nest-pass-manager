import { Body, Controller, Get, Post } from '@nestjs/common';
import { VaultsService } from './vaults.service';
import { Auth, GetUser } from 'src/auth/decorators';
import { CreateVaultDto } from './dto';
import { User } from 'src/user/entities/user.entity';

@Controller('vaults')
export class VaultsController {
  constructor(private readonly vaultsService: VaultsService) {}

  @Get()
  @Auth()
  show() {
    return this.vaultsService.show();
  }

  @Post()
  @Auth()
  create(@Body() createVaultDto: CreateVaultDto, @GetUser() user: User) {
    return this.vaultsService.create(createVaultDto, user);
  }
}
