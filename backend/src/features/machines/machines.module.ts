import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Machine } from 'src/database/models/machine';
import { MachinesService } from './services/machines.service';
import { MachinesController } from './controllers/machines.controller';
import { MachinesRepository } from './repositories/machines.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Machine])],
  controllers: [MachinesController],
  providers: [MachinesService, MachinesRepository],
})
export class MachinesModule {}
