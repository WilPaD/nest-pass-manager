import { Expose, Type } from 'class-transformer';
import { UserResponse } from 'src/user/responses/user.response';

export class VaultResponse {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  isShared: boolean;

  @Expose()
  userId: string;

  @Expose()
  @Type(() => UserResponse)
  user?: UserResponse;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
