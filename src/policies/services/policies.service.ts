import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Policy } from '../entities/policy.entity';
import { Client } from 'src/clients/entities/client.entity';
import { InsuranceType } from 'src/insurance-types/entities/insurance-type.entity';
import { CreatePolicyDto } from '../dto/create-policy.dto';
import { QueryPolicyDto } from '../dto/query-policy.dto';
import { UpdatePolicyDto } from '../dto/update-policy.dto';

@Injectable()
export class PoliciesService {
  constructor(
    @InjectRepository(Policy)
    private readonly policiesRepository: Repository<Policy>,
    @InjectRepository(Client)
    private readonly clientsRepository: Repository<Client>,
    @InjectRepository(InsuranceType)
    private readonly insuranceTypesRepository: Repository<InsuranceType>,
  ) {}

  async create(dto: CreatePolicyDto) {
    this.validateDateRange(dto.startDate, dto.endDate);

    const existingPolicy = await this.policiesRepository.findOne({
      where: { policyNumber: dto.policyNumber.trim() },
    });

    if (existingPolicy) {
      throw new ConflictException('Já existe uma apólice com este número.');
    }

    const client = await this.findClientOrThrow(dto.clientId);
    const insuranceType = await this.findInsuranceTypeOrThrow(dto.insuranceTypeId);

    const policy = this.policiesRepository.create({
      policyNumber: dto.policyNumber.trim(),
      monthlyValue: String(dto.monthlyValue),
      coverageValue: String(dto.coverageValue),
      startDate: dto.startDate,
      endDate: dto.endDate,
      status: dto.status,
      client,
      insuranceType,
    });

    const savedPolicy = await this.policiesRepository.save(policy);
    return this.findOne(savedPolicy.id);
  }

  async findAll(query: QueryPolicyDto) {
    const page = Number(query.page ?? 1);
    const limit = Number(query.limit ?? 10);

    const qb = this.policiesRepository
      .createQueryBuilder('policy')
      .leftJoinAndSelect('policy.client', 'client')
      .leftJoinAndSelect('policy.insuranceType', 'insuranceType');

    if (query.search) {
      qb.andWhere(
        '(LOWER(policy.policyNumber) LIKE LOWER(:search) OR LOWER(client.name) LIKE LOWER(:search))',
        { search: `%${query.search}%` },
      );
    }

    if (query.clientId) {
      qb.andWhere('policy.clientId = :clientId', { clientId: query.clientId });
    }

    if (query.insuranceTypeId) {
      qb.andWhere('policy.insuranceTypeId = :insuranceTypeId', {
        insuranceTypeId: query.insuranceTypeId,
      });
    }

    if (query.status) {
      qb.andWhere('policy.status = :status', { status: query.status });
    }

    if (query.startDateFrom) {
      qb.andWhere('policy.startDate >= :startDateFrom', {
        startDateFrom: query.startDateFrom,
      });
    }

    if (query.startDateTo) {
      qb.andWhere('policy.startDate <= :startDateTo', {
        startDateTo: query.startDateTo,
      });
    }

    qb.orderBy('policy.createdAt', 'DESC');
    qb.skip((page - 1) * limit).take(limit);

    const [policies, total] = await qb.getManyAndCount();

    return {
      items: policies.map((policy) => this.toPolicyListItem(policy)),
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const policy = await this.policiesRepository.findOne({
      where: { id },
      relations: ['client', 'insuranceType'],
    });

    if (!policy) {
      throw new NotFoundException('Apólice não encontrada.');
    }

    return this.toPolicyDetail(policy);
  }

  async update(id: string, dto: UpdatePolicyDto) {
    const policy = await this.findPolicyOrThrow(id);

    if (dto.policyNumber && dto.policyNumber.trim() !== policy.policyNumber) {
      const existingPolicy = await this.policiesRepository.findOne({
        where: { policyNumber: dto.policyNumber.trim() },
      });

      if (existingPolicy) {
        throw new ConflictException('Já existe uma apólice com este número.');
      }
    }

    this.validateDateRange(
      dto.startDate ?? policy.startDate,
      dto.endDate ?? policy.endDate,
    );

    if (dto.clientId) {
      policy.client = await this.findClientOrThrow(dto.clientId);
    }

    if (dto.insuranceTypeId) {
      policy.insuranceType = await this.findInsuranceTypeOrThrow(
        dto.insuranceTypeId,
      );
    }

    Object.assign(policy, {
      ...dto,
      policyNumber: dto.policyNumber
        ? dto.policyNumber.trim()
        : policy.policyNumber,
      monthlyValue:
        dto.monthlyValue !== undefined
          ? String(dto.monthlyValue)
          : policy.monthlyValue,
      coverageValue:
        dto.coverageValue !== undefined
          ? String(dto.coverageValue)
          : policy.coverageValue,
    });

    const savedPolicy = await this.policiesRepository.save(policy);
    return this.findOne(savedPolicy.id);
  }

  async remove(id: string) {
    const policy = await this.findPolicyOrThrow(id);
    await this.policiesRepository.remove(policy);

    return {
      message: 'Apólice removida com sucesso.',
    };
  }

  private async findPolicyOrThrow(id: string) {
    const policy = await this.policiesRepository.findOne({
      where: { id },
      relations: ['client', 'insuranceType'],
    });

    if (!policy) {
      throw new NotFoundException('Apólice não encontrada.');
    }

    return policy;
  }

  private async findClientOrThrow(id: string) {
    const client = await this.clientsRepository.findOneBy({ id });

    if (!client) {
      throw new NotFoundException('Cliente não encontrado.');
    }

    return client;
  }

  private async findInsuranceTypeOrThrow(id: string) {
    const insuranceType = await this.insuranceTypesRepository.findOneBy({ id });

    if (!insuranceType) {
      throw new NotFoundException('Tipo de seguro não encontrado.');
    }

    return insuranceType;
  }

  private validateDateRange(startDate: string | Date, endDate: string | Date) {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();

    if (Number.isNaN(start) || Number.isNaN(end) || end <= start) {
      throw new BadRequestException(
        'A data final da apólice deve ser maior que a data inicial.',
      );
    }
  }

  private toPolicyListItem(policy: Policy) {
    return {
      id: policy.id,
      policyNumber: policy.policyNumber,
      monthlyValue: Number(policy.monthlyValue),
      coverageValue: Number(policy.coverageValue),
      startDate: policy.startDate,
      endDate: policy.endDate,
      status: policy.status,
      client: {
        id: policy.client.id,
        name: policy.client.name,
      },
      insuranceType: {
        id: policy.insuranceType.id,
        name: policy.insuranceType.name,
        category: policy.insuranceType.category,
      },
      createdAt: policy.createdAt,
    };
  }

  private toPolicyDetail(policy: Policy) {
    return {
      ...this.toPolicyListItem(policy),
      updatedAt: policy.updatedAt,
    };
  }
}
