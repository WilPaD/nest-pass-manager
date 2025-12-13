import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateVaultDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsBoolean()
  isShared?: boolean;
}
