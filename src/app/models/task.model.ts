export type TaskType = 'trabajo' | 'casa' | 'negocios';

export interface Task {
  id: string;
  nombre: string;
  descripcion: string;
  tipo: TaskType;
  completada: boolean;
  createdAt: number;
}
