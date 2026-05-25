import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { Router } from '@angular/router';
import { TableAction, TableColumn } from '../models/table.model';

@Component({
  imports: [CommonModule],
  selector: 'component-table',
  templateUrl: './table.component.html',
})
export class TableComponent {
  public items = input<any>([]);
  public columns = input<TableColumn[]>([]);
  public actions = input<TableAction[]>([]);

  constructor(public router: Router) {}
}
