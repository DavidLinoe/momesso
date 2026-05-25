export interface User {
  id: number;
  name: string;
  email: string;
  role?: string;
}

export const USERS_COLUMNS = [
  { name: 'id', label: 'ID' },
  { name: 'name', label: 'Name' },
  { name: 'email', label: 'Email' },
  { name: 'actions', label: 'Actions' },
];
