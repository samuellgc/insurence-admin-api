import { Check, Column, Entity, Index, OneToMany } from 'typeorm';

import { Policy } from '../../policies/entities/policy.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { InsuranceCategory } from 'src/shared/enums/insurance-category.enum';

@Entity({ name: 'insurance_types' })
@Check('chk_insurance_types_base_value_positive', '"base_value" > 0')
export class InsuranceType extends BaseEntity {
  @Index('uq_insurance_types_name', { unique: true })
  @Column({ name: 'name', type: 'varchar', length: 120 })
  name!: string;

  @Column({
    name: 'category',
    type: 'enum',
    enum: InsuranceCategory,
  })
  category!: InsuranceCategory;

  @Column({ name: 'description', type: 'text', nullable: true })
  description?: string | null;

  @Column({ name: 'base_value', type: 'numeric', precision: 12, scale: 2 })
  baseValue!: string;

  @Column({ name: 'active', type: 'boolean', default: true })
  active!: boolean;

  @OneToMany(() => Policy, (policy) => policy.insuranceType)
  policies!: Policy[];
}
