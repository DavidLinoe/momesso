import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { Router } from '@angular/router';
import { TotalizerAction } from '../models/totalizer.model';

@Component({
  imports: [CommonModule],
  selector: 'component-totalizer',
  templateUrl: './totalizer.component.html',
})
export class TotalizerComponent {
  public count = input<any>([]);
  public title = input<string>('');
  public actions = input<TotalizerAction[]>([]);

  constructor(public router: Router) {}
}
