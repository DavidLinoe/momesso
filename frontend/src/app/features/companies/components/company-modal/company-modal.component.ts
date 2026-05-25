import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'feature-companies-component-company-modal',
  templateUrl: './company-modal.component.html',
})
export class CompanyModalComponent {
  public form = input<FormGroup>(new FormGroup({}));
}
