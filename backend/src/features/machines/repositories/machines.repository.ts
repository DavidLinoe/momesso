import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Machine } from 'src/database/models/machine';
import { Repository } from 'typeorm';
import { rlsRepo } from 'src/database/rls/rls.context';

@Injectable()
export class MachinesRepository {
  constructor(
    @InjectRepository(Machine)
    private machinesRepository: Repository<Machine>,
  ) {}

  private get repo(): Repository<Machine> {
    return rlsRepo(this.machinesRepository, Machine);
  }

  async find(machinesId: string): Promise<[Machine[], number]> {
    return await this.repo.findAndCount({
      where: { id: machinesId },
    });
  }

  async findAll(): Promise<[Machine[], number]> {
    return await this.repo.findAndCount({
      where: {},
    });
  }

  async create(machine: Partial<Machine>): Promise<Machine> {
    const entity = this.repo.create(machine);
    return await this.repo.save(entity);
  }

  async update(machine: Partial<Machine>): Promise<Machine | null> {
    if (!machine.id) {
      return null;
    }
    return await this.repo.update(machine.id, machine).then(() => {
      return this.repo.findOne({ where: { id: machine.id } });
    });
  }

  async delete(machinesId: string): Promise<Machine | null> {
    const entity = await this.repo.findOne({
      where: { id: machinesId },
    });
    if (!entity) {
      return null;
    }
    return await this.repo.remove(entity);
  }
}
