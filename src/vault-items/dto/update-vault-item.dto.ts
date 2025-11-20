import { PartialType } from '@nestjs/mapped-types';
import { CreateVaultItemDto } from './create-vault-item.dto';

export class UpdateVaultItemDto extends PartialType(CreateVaultItemDto) {}
