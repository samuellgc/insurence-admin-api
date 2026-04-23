import { Check, Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { Client } from '../../clients/entities/client.entity';
import { InsuranceType } from '../../insurance-types/entities/insurance-type.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { PolicyStatus } from 'src/shared/enums/policy-status.enum';

@Entity({ name: 'policies' })
@Check('chk_policies_end_date_after_start_date', '"end_date" > "start_date"')
@Check('chk_policies_monthly_value_positive', '"monthly_value" > 0')
@Check('chk_policies_coverage_value_positive', '"coverage_value" > 0')
export class Policy extends BaseEntity {
  @Index('uq_policies_policy_number', { unique: true })
  @Column({ name: 'policy_number', type: 'varchar', length: 50 })
  policyNumber!: string;

  @Column({ name: 'monthly_value', type: 'numeric', precision: 12, scale: 2 })
  monthlyValue!: string;

  @Column({ name: 'coverage_value', type: 'numeric', precision: 14, scale: 2 })
  coverageValue!: string;

  @Column({ name: 'start_date', type: 'date' })
  startDate!: Date;

  @Column({ name: 'end_date', type: 'date' })
  endDate!: Date;

  @Column({
    name: 'status',
    type: 'enum',
    enum: PolicyStatus,
    default: PolicyStatus.PENDING,
  })
  status!: PolicyStatus;

  @Index('idx_policies_client_id')
  @Column({ name: 'client_id', type: 'uuid' })
  clientId!: string;

  @Index('idx_policies_insurance_type_id')
  @Column({ name: 'insurance_type_id', type: 'uuid' })
  insuranceTypeId!: string;

  @ManyToOne(() => Client, (client) => client.policies, {
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'client_id' })
  client!: Client;

  @ManyToOne(() => InsuranceType, (insuranceType) => insuranceType.policies, {
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'insurance_type_id' })
  insuranceType!: InsuranceType;
}
