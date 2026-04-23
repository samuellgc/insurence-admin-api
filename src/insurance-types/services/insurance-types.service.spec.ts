import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { InsuranceTypesService } from './insurance-types.service';
import { InsuranceType } from '../entities/insurance-type.entity';
import { Policy } from 'src/policies/entities/policy.entity';

describe('InsuranceTypesService', () => {
  let service: InsuranceTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InsuranceTypesService,
        {
          provide: getRepositoryToken(InsuranceType),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Policy),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<InsuranceTypesService>(InsuranceTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
