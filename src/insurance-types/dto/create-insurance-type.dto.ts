import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';
import { InsuranceCategory } from 'src/shared/enums/insurance-category.enum';

export class CreateInsuranceTypeDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  name!: string;

  @IsEnum(InsuranceCategory)
  category!: InsuranceCategory;

  @IsOptional()
  @IsString()
  description?: string;

  @Transform(({ value }) => String(value))
  @IsNumberString()
  @Matches(/^(?!0+(?:\.0{1,2})?$)\d+(\.\d{1,2})?$/)
  baseValue!: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean = true;
}
