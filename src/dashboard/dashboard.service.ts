import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../clients/entities/client.entity';
import { InsuranceType } from '../insurance-types/entities/insurance-type.entity';
import { Policy } from '../policies/entities/policy.entity';
import { PolicyStatus } from '../shared/enums/policy-status.enum';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Client)
    private readonly clientsRepository: Repository<Client>,
    @InjectRepository(InsuranceType)
    private readonly insuranceTypesRepository: Repository<InsuranceType>,
    @InjectRepository(Policy)
    private readonly policiesRepository: Repository<Policy>,
  ) {}

  async getSummary() {
    const [
      totalClients,
      totalActiveInsuranceTypes,
      totalActivePolicies,
      totalMonthlyValueRaw,
      policiesByStatus,
      policiesByInsuranceType,
      latestPolicies,
    ] = await Promise.all([
      this.clientsRepository.count(),
      this.insuranceTypesRepository.count({
        where: { active: true },
      }),
      this.policiesRepository.count({
        where: { status: PolicyStatus.ACTIVE },
      }),
      this.policiesRepository
        .createQueryBuilder('policy')
        .select('COALESCE(SUM(policy.monthlyValue), 0)', 'total')
        .where('policy.status = :status', { status: PolicyStatus.ACTIVE })
        .getRawOne(),
      this.policiesRepository
        .createQueryBuilder('policy')
        .select('policy.status', 'status')
        .addSelect('COUNT(policy.id)', 'count')
        .groupBy('policy.status')
        .getRawMany(),
      this.policiesRepository
        .createQueryBuilder('policy')
        .leftJoin('policy.insuranceType', 'insuranceType')
        .select('insuranceType.category', 'type')
        .addSelect('COUNT(policy.id)', 'count')
        .groupBy('insuranceType.category')
        .orderBy('count', 'DESC')
        .getRawMany(),
      this.policiesRepository.find({
        relations: ['client', 'insuranceType'],
        order: { createdAt: 'DESC' },
        take: 5,
      }),
    ]);

    return {
      totalClients,
      totalActiveInsuranceTypes,
      totalActivePolicies,
      totalMonthlyValue: Number(totalMonthlyValueRaw?.total ?? 0),
      policiesByStatus: policiesByStatus.map((item) => ({
        status: item.status,
        count: Number(item.count),
      })),
      policiesByInsuranceType: policiesByInsuranceType.map((item) => ({
        type: item.type,
        count: Number(item.count),
      })),
      latestPolicies: latestPolicies.map((policy) => ({
        id: policy.id,
        policyNumber: policy.policyNumber,
        clientName: policy.client.name,
        insuranceTypeName: policy.insuranceType.name,
        status: policy.status,
        monthlyValue: Number(policy.monthlyValue),
        createdAt: policy.createdAt,
      })),
    };
  }
}
