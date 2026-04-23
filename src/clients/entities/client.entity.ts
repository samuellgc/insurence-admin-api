import { Column, Entity, Index, OneToMany } from 'typeorm';

import { BaseEntity } from 'src/common/entities/base.entity';
import { Policy } from 'src/policies/entities/policy.entity';
import { ClientStatus } from 'src/shared/enums/client-status.enum';

@Entity({ name: 'clients' })
export class Client extends BaseEntity {
  @Column({ name: 'name', type: 'varchar', length: 150 })
  name: string;

  @Index('uq_clients_cpf', { unique: true })
  @Column({ name: 'cpf', type: 'varchar', length: 14 })
  cpf: string;

  @Index('uq_clients_email', { unique: true })
  @Column({ name: 'email', type: 'varchar', length: 180 })
  email: string;

  @Column({ name: 'phone', type: 'varchar', length: 20 })
  phone: string;

  @Column({ name: 'birth_date', type: 'date', nullable: true })
  birthDate?: Date | null;

  @Column({ name: 'cep', type: 'varchar', length: 9, nullable: true })
  cep?: string | null;

  @Column({ name: 'street', type: 'varchar', length: 180, nullable: true })
  street?: string | null;

  @Column({ name: 'number', type: 'varchar', length: 20, nullable: true })
  number?: string | null;

  @Column({ name: 'district', type: 'varchar', length: 120, nullable: true })
  district?: string | null;

  @Column({ name: 'city', type: 'varchar', length: 120, nullable: true })
  city?: string | null;

  @Column({ name: 'state', type: 'char', length: 2, nullable: true })
  state?: string | null;

  @Column({
    name: 'status',
    type: 'enum',
    enum: ClientStatus,
    default: ClientStatus.ACTIVE,
  })
  status: ClientStatus;

  @OneToMany(() => Policy, (policy) => policy.client)
  policies: Policy[];
}
