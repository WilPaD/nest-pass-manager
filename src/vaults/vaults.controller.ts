import { Body, Controller, Get, Post, Param, Query } from '@nestjs/common';
import { VaultsService } from './vaults.service';
import { Auth, GetUser } from 'src/auth/decorators';
import { CreateVaultDto } from './dto';
import { User } from 'src/user/entities/user.entity';
import { PaginationDto } from 'src/core/dto';

@Controller('vaults')
@Auth()
export class VaultsController {
  constructor(private readonly vaultsService: VaultsService) {}

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.vaultsService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.vaultsService.findOne(term);
  }

  @Post()
  create(@Body() createVaultDto: CreateVaultDto, @GetUser() user: User) {
    return this.vaultsService.create(createVaultDto, user);
  }
}
