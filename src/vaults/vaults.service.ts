import { Injectable } from '@nestjs/common';
import { CreateVaultDto } from './dto';
import { User } from '../user/entities/user.entity';
@Injectable()
export class VaultsService {
  show() {
    return 'Hello from VaultsService';
  }

  create(createVaultDto: CreateVaultDto, user: User) {
    return `Vault created for user ${user.id} with data: ${JSON.stringify(createVaultDto)}`;
  }
}
