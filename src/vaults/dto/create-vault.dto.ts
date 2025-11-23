import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateVaultDto {
  @IsString()
  name: string;

  @IsBoolean()
  @IsOptional()
  isShared: boolean = false;
}
