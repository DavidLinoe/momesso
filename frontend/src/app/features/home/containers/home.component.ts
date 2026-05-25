import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  imports: [CommonModule],
  selector: 'feature-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  constructor(public router: Router) {}

}
