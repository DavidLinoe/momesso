import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { CompaniesService } from '../services/companies.service';
import type { ResponseApi } from 'src/utils/models/responseApi.model';
import { Company } from 'src/database/models/company';
import { FindCompaniesDto } from '../dtos/find.dto';
import { CreateCompaniesDto } from '../dtos/create.dto';
import { UpdateCompaniesDto } from '../dtos/update.dto';
import { DeleteCompaniesDto } from '../dtos/delete.dto';

@ApiTags('companies')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  @ApiOperation({ summary: 'List companies' })
  async find(
    @Query() { userId }: FindCompaniesDto,
  ): Promise<ResponseApi<Company[] | null>> {
    return await this.companiesService.find(userId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new company' })
  @ApiBody({ type: CreateCompaniesDto })
  async create(@Body() company: Company): Promise<ResponseApi<Company | null>> {
    return await this.companiesService.create(company);
  }

  @Put()
  @ApiOperation({ summary: 'Update a company' })
  @ApiBody({ type: UpdateCompaniesDto })
  async update(@Body() company: Company): Promise<ResponseApi<Company | null>> {
    return await this.companiesService.update(company);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete a company' })
  async delete(
    @Query() { companyId }: DeleteCompaniesDto,
  ): Promise<ResponseApi<Company | null>> {
    return await this.companiesService.delete(companyId);
  }
}
