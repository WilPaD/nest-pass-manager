import { User } from 'src/user/entities/user.entity';
import { VaultItem } from 'src/vault-items/entities/vault-item.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @OneToMany(() => VaultItem, (vaultItem) => vaultItem.vault)
  items: VaultItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
