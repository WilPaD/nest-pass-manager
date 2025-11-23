import { IsJSON, IsString } from 'class-validator';

export class CreateVaultItemDto {
  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsJSON()
  encryptedData: Record<string, any>;
}
