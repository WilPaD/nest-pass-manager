import { Expose } from 'class-transformer';

export class UserResource {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  lastName: string;

  @Expose()
  email: string;

  @Expose()
  phone: string;

  @Expose()
  isActive: boolean;
}
