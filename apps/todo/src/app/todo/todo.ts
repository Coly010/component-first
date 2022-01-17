export interface Todo {
  id: number;
  text: string;
  creationDate: Date;
  completed: boolean;
}

export type TodoFilter = 'SHOW_ALL' | 'SHOW_ACTIVE' | 'SHOW_COMPLETED';
