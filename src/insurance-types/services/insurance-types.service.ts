import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InsuranceType } from '../entities/insurance-type.entity';
import { CreateInsuranceTypeDto } from '../dto/create-insurance-type.dto';
import { QueryInsuranceTypeDto } from '../dto/query-insurance-type.dto';
import { UpdateInsuranceTypeDto } from '../dto/update-insurance-type.dto';
import { Policy } from 'src/policies/entities/policy.entity';

@Injectable()
export class InsuranceTypesService {
  constructor(
    @InjectRepository(InsuranceType)
    private readonly insuranceTypesRepository: Repository<InsuranceType>,
    @InjectRepository(Policy)
    private readonly policiesRepository: Repository<Policy>,
  ) {}

  async create(dto: CreateInsuranceTypeDto) {
    const existing = await this.insuranceTypesRepository.findOne({
      where: { name: dto.name.trim() },
    });

    if (existing) {
      throw new ConflictException('Já existe um tipo de seguro com este nome.');
    }

    const insuranceType = this.insuranceTypesRepository.create({
      ...this.normalizeInsuranceType(dto),
      name: dto.name.trim(),
    });

    const savedInsuranceType =
      await this.insuranceTypesRepository.save(insuranceType);

    return this.toInsuranceTypeDetail(savedInsuranceType);
  }

  async findAll(query: QueryInsuranceTypeDto) {
    const page = Number(query.page ?? 1);
    const limit = Number(query.limit ?? 10);

    const qb =
      this.insuranceTypesRepository.createQueryBuilder('insuranceType');

    if (query.search) {
      qb.andWhere(
        '(LOWER(insuranceType.name) LIKE LOWER(:search) OR LOWER(insuranceType.description) LIKE LOWER(:search))',
        { search: `%${query.search}%` },
      );
    }

    if (query.category) {
      qb.andWhere('insuranceType.category = :category', {
        category: query.category,
      });
    }

    if (query.active !== undefined) {
      qb.andWhere('insuranceType.active = :active', {
        active: query.active === true,
      });
    }

    qb.orderBy('insuranceType.createdAt', 'DESC');
    qb.skip((page - 1) * limit).take(limit);

    const [insuranceTypes, total] = await qb.getManyAndCount();

    return {
      items: insuranceTypes.map((insuranceType) =>
        this.toInsuranceTypeListItem(insuranceType),
      ),
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const insuranceType = await this.findInsuranceTypeOrThrow(id);
    return this.toInsuranceTypeDetail(insuranceType);
  }

  async update(id: string, dto: UpdateInsuranceTypeDto) {
    const insuranceType = await this.findInsuranceTypeOrThrow(id);

    if (dto.name && dto.name.trim() !== insuranceType.name) {
      const existing = await this.insuranceTypesRepository.findOne({
        where: { name: dto.name.trim() },
      });

      if (existing) {
        throw new ConflictException(
          'Já existe um tipo de seguro com este nome.',
        );
      }
    }

    Object.assign(insuranceType, {
      ...this.normalizeInsuranceType(dto),
      name: dto.name ? dto.name.trim() : insuranceType.name,
    });

    const savedInsuranceType =
      await this.insuranceTypesRepository.save(insuranceType);

    return this.toInsuranceTypeDetail(savedInsuranceType);
  }

  async remove(id: string) {
    const insuranceType = await this.findInsuranceTypeOrThrow(id);
    const policiesCount = await this.policiesRepository.countBy({
      insuranceTypeId: id,
    });

    if (policiesCount > 0) {
      if (insuranceType.active) {
        insuranceType.active = false;
        await this.insuranceTypesRepository.save(insuranceType);
      }

      return {
        message: 'Tipo de seguro inativado com sucesso.',
      };
    }

    await this.insuranceTypesRepository.remove(insuranceType);

    return {
      message: 'Tipo de seguro removido com sucesso.',
    };
  }

  private async findInsuranceTypeOrThrow(id: string) {
    const insuranceType = await this.insuranceTypesRepository.findOneBy({ id });

    if (!insuranceType) {
      throw new NotFoundException('Tipo de seguro não encontrado.');
    }

    return insuranceType;
  }

  private normalizeInsuranceType(
    dto: CreateInsuranceTypeDto | UpdateInsuranceTypeDto,
  ) {
    return {
      ...dto,
      description: dto.description?.trim() || null,
      baseValue:
        dto.baseValue !== undefined ? String(dto.baseValue) : dto.baseValue,
    };
  }

  private toInsuranceTypeListItem(insuranceType: InsuranceType) {
    return {
      id: insuranceType.id,
      name: insuranceType.name,
      category: insuranceType.category,
      description: insuranceType.description ?? null,
      baseValue: Number(insuranceType.baseValue),
      active: insuranceType.active,
      createdAt: insuranceType.createdAt,
    };
  }

  private toInsuranceTypeDetail(insuranceType: InsuranceType) {
    return {
      id: insuranceType.id,
      name: insuranceType.name,
      category: insuranceType.category,
      description: insuranceType.description ?? null,
      baseValue: Number(insuranceType.baseValue),
      active: insuranceType.active,
      createdAt: insuranceType.createdAt,
      updatedAt: insuranceType.updatedAt,
    };
  }
}
