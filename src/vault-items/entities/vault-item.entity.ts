import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Vault } from 'src/vaults/entities/vault.entity';
import { User } from 'src/user/entities/user.entity';

@Entity('vault_items')
export class VaultItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Vault, (vault) => vault.items, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  vault: Vault | null;

  @ManyToOne(() => User, (user) => user.vaultItems, { onDelete: 'CASCADE' })
  user: User;

  @Column('text')
  type: string;

  @Column('text')
  name: string;

  @Column({ type: 'jsonb' })
  encryptedData: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
