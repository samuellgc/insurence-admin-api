import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column({ name: 'name', type: 'varchar', length: 120 })
  name!: string;

  @Index('uq_users_email', { unique: true })
  @Column({ name: 'email', type: 'varchar', length: 180 })
  email!: string;

  @Column({ name: 'password', type: 'varchar', length: 255, select: false })
  password!: string;
}
