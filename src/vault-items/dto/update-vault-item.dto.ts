import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateVaultItemDto } from './create-vault-item.dto';

export class UpdateVaultItemDto extends PartialType(
  OmitType(CreateVaultItemDto, ['type'] as const),
) {}
