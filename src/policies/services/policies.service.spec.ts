import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PoliciesService } from './policies.service';
import { Policy } from '../entities/policy.entity';
import { Client } from 'src/clients/entities/client.entity';
import { InsuranceType } from 'src/insurance-types/entities/insurance-type.entity';

describe('PoliciesService', () => {
  let service: PoliciesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PoliciesService,
        {
          provide: getRepositoryToken(Policy),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Client),
          useValue: {},
        },
        {
          provide: getRepositoryToken(InsuranceType),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<PoliciesService>(PoliciesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
