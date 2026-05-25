import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { Router } from '@angular/router';
import { ModalButtons } from '../models/modal.model';

@Component({
  imports: [CommonModule],
  selector: 'component-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent {
    public open = input<boolean>(false);

  public title = input<string>('');
  public buttons = input<ModalButtons[]>([]);
  public close = output<boolean>();


  constructor(public router: Router) {}
}
