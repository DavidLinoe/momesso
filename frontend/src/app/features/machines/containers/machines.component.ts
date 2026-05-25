import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TableComponent } from '../../../components/table/containers/table.component';
import { TotalizerComponent } from '../../../components/totalizer/containers/totalizer.component';
import { ModalComponent } from '../../../components/modal/containers/modal.component';
import { MachineModalComponent } from '../components/machine-modal/machine-modal.component';
import { MachinesFacade } from '../facades/machines.facade';
import { MachinesApi } from '../apis/machines.api';
import { Machine, MACHINES_COLUMNS } from '../models/machines.model';

@Component({
  imports: [
    CommonModule,
    TableComponent,
    TotalizerComponent,
    ModalComponent,
    MachineModalComponent,
  ],
  selector: 'feature-machines',
  templateUrl: './machines.component.html',
  providers: [MachinesFacade, MachinesApi],
})
export class MachinesComponent implements OnInit {
  public open: boolean = false;
  public machineFormGroup!: FormGroup;
  public columns = MACHINES_COLUMNS;

  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    public machinesFacade: MachinesFacade,
  ) {}

  ngOnInit(): void {
    this.machineFormGroup = this.formBuilder.group({
      id: [null],
      name: [''],
      serialNumber: [''],
    });
    this.machinesFacade.getAllMachines();
  }

  openCreateMachine(): void {
    this.machineFormGroup.reset({
      id: null,
      name: '',
      serialNumber: '',
    });
    this.open = true;
  }

  openEditMachine(machine: Machine): void {
    this.machineFormGroup.patchValue(machine);
    this.open = true;
  }

  submitMachine(): void {
    const { id, ...payload } = this.machineFormGroup.value;
    if (id) {
      this.machinesFacade.updateMachine(id, payload);
    } else {
      this.machinesFacade.createMachine(payload);
    }
    this.open = false;
  }

  deleteMachine(machine: Machine): void {
    this.machinesFacade.deleteMachine(machine.id);
  }
}
