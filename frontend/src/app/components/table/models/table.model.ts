export interface TableColumn {
  name: string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  type?: 'text' | 'number' | 'date' | 'boolean';
}

export interface TableAction {
  label: string;
  icon?: string;
  callback: (item: any) => void;
}
