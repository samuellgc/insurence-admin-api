import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
} from 'class-validator';
import { PolicyStatus } from 'src/shared/enums/policy-status.enum';

export class CreatePolicyDto {
  @IsUUID()
  clientId!: string;

  @IsUUID()
  insuranceTypeId!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  policyNumber!: string;

  @Transform(({ value }) => String(value))
  @IsNumberString()
  @Matches(/^(?!0+(?:\.0{1,2})?$)\d+(\.\d{1,2})?$/)
  monthlyValue!: string;

  @Transform(({ value }) => String(value))
  @IsNumberString()
  @Matches(/^(?!0+(?:\.0{1,2})?$)\d+(\.\d{1,2})?$/)
  coverageValue!: string;

  @IsDateString()
  startDate!: string;

  @IsDateString()
  endDate!: string;

  @IsEnum(PolicyStatus)
  status!: PolicyStatus;
}
