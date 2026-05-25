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
import { MachinesService } from '../services/machines.service';
import type { ResponseApi } from 'src/utils/models/responseApi.model';
import { FindMachinesDto } from '../dtos/find.dto';
import { CreateMachinesDto } from '../dtos/create.dto';
import { UpdateMachinesDto } from '../dtos/update.dto';
import { DeleteMachinesDto } from '../dtos/delete.dto';
import { Machine } from 'src/database/models/machine';

@ApiTags('machines')
@Controller('machines')
export class MachinesController {
  constructor(private readonly machinesService: MachinesService) {}

  @Get('/all')
  @ApiOperation({ summary: 'List All Machines' })
  async findAll(): Promise<ResponseApi<Machine[] | null>> {
    return await this.machinesService.findAll();
  }

  @Get()
  @ApiOperation({ summary: 'List Machines' })
  async find(
    @Query() { machineId }: FindMachinesDto,
  ): Promise<ResponseApi<Machine[] | null>> {
    return await this.machinesService.find(machineId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new machine' })
  @ApiBody({ type: CreateMachinesDto })
  async create(@Body() machine: Machine): Promise<ResponseApi<Machine | null>> {
    return await this.machinesService.create(machine);
  }

  @Put()
  @ApiOperation({ summary: 'Update a machine' })
  @ApiBody({ type: UpdateMachinesDto })
  async update(@Body() machine: Machine): Promise<ResponseApi<Machine | null>> {
    return await this.machinesService.update(machine);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete a machine' })
  async delete(
    @Query() { machineId }: DeleteMachinesDto,
  ): Promise<ResponseApi<Machine | null>> {
    return await this.machinesService.delete(machineId);
  }
}
