import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'feature-users-component-user-modal',
  templateUrl: './user-modal.component.html',
})
export class UserModalComponent {
  public form = input<FormGroup>(new FormGroup({}));
}
