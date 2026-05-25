import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../navbar/containers/navbar.component';

@Component({
  imports: [RouterOutlet, NavbarComponent],
  selector: 'layout-navigation',
  templateUrl: './navigation.component.html',
})
export class NavigationComponent {}
