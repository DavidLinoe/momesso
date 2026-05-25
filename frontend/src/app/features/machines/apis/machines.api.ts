import { Injectable } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Machine } from '../models/machines.model';

@Injectable()
export class MachinesApi {
  constructor(private apiService: ApiService) {}

  getAllMachines() {
    return this.apiService.get<Machine[]>(`machines/all`);
  }

  createMachine(machine: Partial<Machine>) {
    return this.apiService.post<Machine>('machines', machine);
  }

  updateMachine(id: string, machine: Partial<Machine>) {
    return this.apiService.put<Machine>('machines', { id, ...machine });
  }

  deleteMachine(id: string) {
    return this.apiService.delete<Machine>(`machines?machineId=${id}`);
  }
}
