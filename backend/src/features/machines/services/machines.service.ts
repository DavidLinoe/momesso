import { Injectable } from '@nestjs/common';
import { MachinesRepository } from '../repositories/machines.repository';
import { ResponseApi } from 'src/utils/models/responseApi.model';
import { Machine } from 'src/database/models/machine';

@Injectable()
export class MachinesService {
  constructor(private machinesRepository: MachinesRepository) {}

  async find(machineId?: string): Promise<ResponseApi<Machine[] | null>> {
    if (!machineId) {
      return {
        statusCode: 400,
        message: 'Machine ID is required',
        data: null,
      };
    }
    return await this.machinesRepository
      .find(machineId)
      .then(([data, count]: [Machine[], number]) => {
        return {
          statusCode: 200,
          message: 'Machines found',
          data,
          count,
        };
      })
      .catch((error: Error) => {
        return {
          statusCode: 500,
          message:
            'An error occurred while fetching Machines: ' + error.message,
          data: null,
        };
      });
  }
  async findAll(): Promise<ResponseApi<Machine[] | null>> {
    return await this.machinesRepository
      .findAll()
      .then(([data, count]: [Machine[], number]) => {
        return {
          statusCode: 200,
          message: 'Machines found',
          data,
          count,
        };
      })
      .catch((error: Error) => {
        return {
          statusCode: 500,
          message:
            'An error occurred while fetching Machines: ' + error.message,
          data: null,
        };
      });
  }
  async create(machine: Machine): Promise<ResponseApi<Machine | null>> {
    if (!machine) {
      return {
        statusCode: 400,
        message: 'Machine data is required',
        data: null,
      };
    }
    return await this.machinesRepository
      .create(machine)
      .then((data: Machine) => {
        return {
          statusCode: 201,
          message: 'Machine created',
          data,
        };
      })
      .catch((error: Error) => {
        return {
          statusCode: 500,
          message: 'An error occurred while creating Machine: ' + error.message,
          data: null,
        };
      });
  }

  async update(machine: Machine): Promise<ResponseApi<Machine | null>> {
    if (!machine) {
      return {
        statusCode: 400,
        message: 'Machine data is required',
        data: null,
      };
    }
    return await this.machinesRepository
      .update(machine)
      .then((data: Machine | null) => {
        if (!data) {
          return {
            statusCode: 404,
            message: 'Machine not found',
            data: null,
          };
        }
        return {
          statusCode: 201,
          message: 'Machine Updated',
          data,
        };
      })
      .catch((error: Error) => {
        return {
          statusCode: 500,
          message: 'An error occurred while updating machine: ' + error.message,
          data: null,
        };
      });
  }
  async delete(machineId: string): Promise<ResponseApi<Machine | null>> {
    if (!machineId) {
      return {
        statusCode: 400,
        message: 'Machine ID is required',
        data: null,
      };
    }
    return await this.machinesRepository
      .delete(machineId)
      .then((data: Machine | null) => {
        if (!data) {
          return {
            statusCode: 404,
            message: 'Machine not found',
            data: null,
          };
        }
        return {
          statusCode: 201,
          message: 'Machine deleted',
          data,
        };
      })
      .catch((error: Error) => {
        return {
          statusCode: 500,
          message: 'An error occurred while deleting Machine: ' + error.message,
          data: null,
        };
      });
  }
}
