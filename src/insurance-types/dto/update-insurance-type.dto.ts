import { PartialType } from '@nestjs/mapped-types';

import { CreateInsuranceTypeDto } from './create-insurance-type.dto';

export class UpdateInsuranceTypeDto extends PartialType(
  CreateInsuranceTypeDto,
) {}
