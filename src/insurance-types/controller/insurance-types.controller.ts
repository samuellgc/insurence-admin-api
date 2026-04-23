import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { InsuranceTypesService } from '../services/insurance-types.service';
import { CreateInsuranceTypeDto } from '../dto/create-insurance-type.dto';
import { QueryInsuranceTypeDto } from '../dto/query-insurance-type.dto';
import { UpdateInsuranceTypeDto } from '../dto/update-insurance-type.dto';

@Controller('insurance-types')
@UseGuards(JwtAuthGuard)
export class InsuranceTypesController {
  constructor(private readonly insuranceTypesService: InsuranceTypesService) {}

  @Post()
  create(@Body() dto: CreateInsuranceTypeDto) {
    return this.insuranceTypesService.create(dto);
  }

  @Get()
  findAll(@Query() query: QueryInsuranceTypeDto) {
    return this.insuranceTypesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.insuranceTypesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateInsuranceTypeDto) {
    return this.insuranceTypesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.insuranceTypesService.remove(id);
  }
}
