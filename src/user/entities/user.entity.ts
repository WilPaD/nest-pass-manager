import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { nullable: true })
  name: string;

  @Column('text', { nullable: true })
  lastName: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text', { unique: true, nullable: true })
  phone: string;

  // @Column('text', { nullable: true }) // Esto por si se quiere usar OTP
  // password: string;

  @Column('text', { nullable: true })
  masterPassword: string;

  @Column('date', { nullable: true })
  verifiedAt: Date;

  @Column('bool', { default: true })
  isActive: boolean;

  @Column('bool', { default: false })
  isDeleted: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }
}
