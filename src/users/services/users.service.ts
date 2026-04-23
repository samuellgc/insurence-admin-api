import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  async create(dto: CreateUserDto) {
    const hashedPassword = await hash(dto.password, this.getSaltRounds());

    const user = this.usersRepository.create({
      name: dto.name,
      email: dto.email.toLowerCase().trim(),
      password: hashedPassword,
    });

    const savedUser = await this.usersRepository.save(user);
    return this.findById(savedUser.id);
  }

  async findAll() {
    return this.usersRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findById(id: string) {
    const user = await this.findByIdOrNull(id);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return user;
  }

  async findByIdOrNull(id: string) {
    return this.usersRepository.findOneBy({ id });
  }

  async findByEmail(email: string) {
    return this.usersRepository.findOne({
      where: {
        email: email.toLowerCase().trim(),
      },
    });
  }

  async findByEmailWithPassword(email: string) {
    return this.usersRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('LOWER(user.email) = LOWER(:email)', { email: email.trim() })
      .getOne();
  }

  async update(id: string, dto: UpdateUserDto) {
    const user = await this.findById(id);

    if (dto.name !== undefined) {
      user.name = dto.name;
    }

    if (dto.email !== undefined) {
      user.email = dto.email.toLowerCase().trim();
    }

    if (dto.password !== undefined) {
      user.password = await hash(dto.password, this.getSaltRounds());
    }

    const savedUser = await this.usersRepository.save(user);
    return this.findById(savedUser.id);
  }

  async remove(id: string) {
    const user = await this.findById(id);
    await this.usersRepository.remove(user);

    return {
      message: 'Usuário removido com sucesso.',
    };
  }

  private getSaltRounds() {
    return this.configService.get<number>('auth.bcryptSaltRounds') ?? 10;
  }
}
