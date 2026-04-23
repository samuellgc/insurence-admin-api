import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../entities/client.entity';
import { CreateClientDto } from '../dto/create-client.dto';
import { UpdateClientDto } from '../dto/update-client.dto';
import { QueryClientDto } from '../dto/query-client.dto';
import { Policy } from 'src/policies/entities/policy.entity';
import { ClientStatus } from 'src/shared/enums/client-status.enum';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientsRepository: Repository<Client>,
    @InjectRepository(Policy)
    private readonly policiesRepository: Repository<Policy>,
  ) {}

  async create(dto: CreateClientDto) {
    const existingCpf = await this.clientsRepository.findOne({
      where: { cpf: dto.cpf },
    });

    if (existingCpf) {
      throw new ConflictException('Já existe um cliente com este CPF.');
    }

    const existingEmail = await this.clientsRepository.findOne({
      where: { email: dto.email.toLowerCase().trim() },
    });

    if (existingEmail) {
      throw new ConflictException('Já existe um cliente com este e-mail.');
    }

    const client = this.clientsRepository.create({
      ...dto,
      email: this.normalizeEmail(dto.email),
    });

    const savedClient = await this.clientsRepository.save(client);
    return this.toClientDetail(savedClient);
  }

  async findAll(query: QueryClientDto) {
    const page = Number(query.page ?? 1);
    const limit = Number(query.limit ?? 10);

    const qb = this.clientsRepository.createQueryBuilder('client');

    if (query.search) {
      qb.andWhere(
        '(LOWER(client.name) LIKE LOWER(:search) OR client.cpf LIKE :search OR LOWER(client.email) LIKE LOWER(:search))',
        { search: `%${query.search}%` },
      );
    }

    if (query.status) {
      qb.andWhere('client.status = :status', { status: query.status });
    }

    qb.orderBy('client.createdAt', 'DESC');
    qb.skip((page - 1) * limit).take(limit);

    const [clients, total] = await qb.getManyAndCount();

    return {
      items: clients.map((client) => this.toClientListItem(client)),
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const client = await this.findClientOrThrow(id);
    return this.toClientDetail(client);
  }

  async update(id: string, dto: UpdateClientDto) {
    const client = await this.findClientOrThrow(id);

    if (dto.cpf && dto.cpf !== client.cpf) {
      const existingCpf = await this.clientsRepository.findOne({
        where: { cpf: dto.cpf },
      });

      if (existingCpf) {
        throw new ConflictException('Já existe um cliente com este CPF.');
      }
    }

    if (dto.email && dto.email.toLowerCase().trim() !== client.email) {
      const existingEmail = await this.clientsRepository.findOne({
        where: { email: dto.email.toLowerCase().trim() },
      });

      if (existingEmail) {
        throw new ConflictException('Já existe um cliente com este e-mail.');
      }
    }

    Object.assign(client, {
      ...dto,
      email: dto.email ? this.normalizeEmail(dto.email) : client.email,
    });

    const savedClient = await this.clientsRepository.save(client);
    return this.toClientDetail(savedClient);
  }

  async remove(id: string) {
    const client = await this.findClientOrThrow(id);
    const policiesCount = await this.policiesRepository.countBy({ clientId: id });

    if (policiesCount > 0) {
      if (client.status !== ClientStatus.INACTIVE) {
        client.status = ClientStatus.INACTIVE;
        await this.clientsRepository.save(client);
      }

      return {
        message: 'Cliente inativado com sucesso.',
      };
    }

    await this.clientsRepository.remove(client);

    return {
      message: 'Cliente removido com sucesso.',
    };
  }

  private async findClientOrThrow(id: string) {
    const client = await this.clientsRepository.findOneBy({ id });

    if (!client) {
      throw new NotFoundException('Cliente não encontrado.');
    }

    return client;
  }

  private normalizeEmail(email: string) {
    return email.toLowerCase().trim();
  }

  private toClientListItem(client: Client) {
    return {
      id: client.id,
      name: client.name,
      cpf: client.cpf,
      email: client.email,
      phone: client.phone,
      city: client.city ?? null,
      state: client.state ?? null,
      status: client.status,
      createdAt: client.createdAt,
    };
  }

  private toClientDetail(client: Client) {
    return {
      id: client.id,
      name: client.name,
      cpf: client.cpf,
      email: client.email,
      phone: client.phone,
      birthDate: client.birthDate ?? null,
      cep: client.cep ?? null,
      street: client.street ?? null,
      number: client.number ?? null,
      district: client.district ?? null,
      city: client.city ?? null,
      state: client.state ?? null,
      status: client.status,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    };
  }
}
