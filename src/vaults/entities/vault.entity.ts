import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('vaults')
export class Vault {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.vaults, { onDelete: 'CASCADE' })
  user: User;

  @Column('text')
  name: string;

  @Column({ default: false })
  isShared: boolean;
}
