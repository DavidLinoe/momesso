export interface NavbarItem {
  id: string;
  label: string;
  icon: string;
  route: string;
}
export const NAVBAR_ITEMS: NavbarItem[] = [
  {
    id: 'home',
    label: 'Home',
    icon: 'home',
    route: '/home',
  },
  {
    id: 'about',
    label: 'About',
    icon: 'info',
    route: '/about',
  },
  {
    id: 'machines',
    label: 'Machines',
    icon: 'cog',
    route: '/machines',
  },
  {
    id: 'users',
    label: 'Users',
    icon: 'users',
    route: '/users',
  },
  {
    id: 'companies',
    label: 'Companies',
    icon: 'building',
    route: '/companies',
  },
];
