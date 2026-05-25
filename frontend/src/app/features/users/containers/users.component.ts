import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TableComponent } from '../../../components/table/containers/table.component';
import { TotalizerComponent } from '../../../components/totalizer/containers/totalizer.component';
import { ModalComponent } from '../../../components/modal/containers/modal.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserModalComponent } from '../components/user-modal/user-modal.component';
import { UsersFacade } from '../facades/users.facade';
import { UsersApi } from '../apis/users.api';
import { User, USERS_COLUMNS } from '../models/users.model';

@Component({
  imports: [CommonModule, TableComponent, TotalizerComponent, ModalComponent, UserModalComponent],
  selector: 'feature-users',
  templateUrl: './users.component.html',
  providers: [UsersFacade, UsersApi],
})
export class UsersComponent implements OnInit {
  public open: boolean = false;
  public userFormGroup!: FormGroup;
  public columns = USERS_COLUMNS;

  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    public usersFacade: UsersFacade,
  ) {}

  ngOnInit(): void {
    this.userFormGroup = this.formBuilder.group({
      id: [null],
      name: [''],
      email: [''],
      role: [''],
    });
    this.usersFacade.getAllUsers();
  }

  openCreateUser(): void {
    this.userFormGroup.reset({ id: null, name: '', email: '', role: '' });
    this.open = true;
  }

  openEditUser(user: User): void {
    this.userFormGroup.patchValue(user);
    this.open = true;
  }

  submitUser(): void {
    const { id, ...payload } = this.userFormGroup.value;
    if (id) {
      this.usersFacade.updateUser(id, payload);
    } else {
      this.usersFacade.createUser(payload);
    }
    this.open = false;
  }

  deleteUser(user: User): void {
    this.usersFacade.deleteUser(user.id);
  }
}
