import { Routes } from '@angular/router';
import { routes as navigationRoutes } from './layout/navigation/routing/navigation.routing';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/navigation/containers/navigation.component').then(
        (m) => m.NavigationComponent,
      ),
    children: navigationRoutes,
  },
];
