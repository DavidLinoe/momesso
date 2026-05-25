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
import { UsersService } from '../services/users.service';
import type { ResponseApi } from 'src/utils/models/responseApi.model';
import { User } from 'src/database/models/user';
import { FindUsersDto } from '../dtos/find.dto';
import { CreateUsersDto } from '../dtos/create.dto';
import { UpdateUsersDto } from '../dtos/update.dto';
import { DeleteUsersDto } from '../dtos/delete.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'List User' })
  async find(
    @Query() { companyId }: FindUsersDto,
  ): Promise<ResponseApi<User[] | null>> {
    return await this.usersService.find(companyId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUsersDto })
  async create(@Body() user: User): Promise<ResponseApi<User | null>> {
    return await this.usersService.create(user);
  }

  @Put()
  @ApiOperation({ summary: 'Update a user' })
  @ApiBody({ type: UpdateUsersDto })
  async update(@Body() user: User): Promise<ResponseApi<User | null>> {
    return await this.usersService.update(user);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete a user' })
  async delete(
    @Query() { userId }: DeleteUsersDto,
  ): Promise<ResponseApi<User | null>> {
    return await this.usersService.delete(userId);
  }
}
