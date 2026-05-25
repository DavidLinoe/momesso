import { CommonModule } from '@angular/common';
import { Component, signal, Signal } from '@angular/core';
import { NAVBAR_ITEMS, NavbarItem } from '../models/navbar.model';
import { Router } from '@angular/router';

@Component({
  imports: [CommonModule],
  selector: 'layout-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  constructor(public router: Router) {}

  public navbarItems: Signal<NavbarItem[]> = signal(NAVBAR_ITEMS);
}
