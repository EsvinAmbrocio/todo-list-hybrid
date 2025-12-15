import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { Task, TaskType } from '../models/task.model';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  @ViewChild('addModal') addModal!: IonModal;
  @ViewChild('addModalEmpty') addModalEmpty!: IonModal;

  tasks: Task[] = [];
  pendingTasks: Task[] = [];
  completedTasks: Task[] = [];
  pendingCount = 0;
  completedCount = 0;
  selectedFilter: 'pendientes' | 'todas' | 'completadas' = 'pendientes';

  // Form fields
  nombre = '';
  descripcion = '';
  tipo: TaskType = 'trabajo';

  constructor(private taskService: TaskService, private router: Router) {}

  ionViewWillEnter() {
    this.loadTasks();
  }

  private loadTasks() {
    this.tasks = this.taskService.getTasks();
    this.pendingTasks = this.tasks.filter(t => !t.completada);
    this.completedTasks = this.tasks.filter(t => t.completada);
    this.pendingCount = this.pendingTasks.length;
    this.completedCount = this.tasks.length - this.pendingCount;
  }

  get filteredTasks(): Task[] {
    switch (this.selectedFilter) {
      case 'todas':
        return this.tasks;
      case 'completadas':
        return this.completedTasks;
      case 'pendientes':
      default:
        return this.pendingTasks;
    }
  }

  onFilterChange(value: any) {
    const v = (value as 'pendientes' | 'todas' | 'completadas') || 'pendientes';
    this.selectedFilter = v;
  }

  addTask() {
    const trimmedName = this.nombre.trim();
    const trimmedDesc = this.descripcion.trim();
    if (!trimmedName || !this.tipo) {
      return;
    }
    const newTask: Task = {
      id: this.generateId(),
      nombre: trimmedName,
      descripcion: trimmedDesc,
      tipo: this.tipo,
      completada: false,
      createdAt: Date.now(),
    };
    this.taskService.addTask(newTask);
    this.resetForm();
    this.loadTasks();
    this.dismissModal();
  }

  dismissModal() {
    if (this.addModal) {
      this.addModal.dismiss();
    }
    if (this.addModalEmpty) {
      this.addModalEmpty.dismiss();
    }
  }

  completeTask(task: Task) {
    const updated: Task = { ...task, completada: true };
    this.taskService.updateTask(updated);
    this.loadTasks();
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task.id);
    this.loadTasks();
  }

  openDetails(task: Task) {
    this.router.navigate(['/task', task.id]);
  }

  private resetForm() {
    this.nombre = '';
    this.descripcion = '';
    this.tipo = 'trabajo';
  }

  private generateId(): string {
    return (
      Date.now().toString(36) + Math.random().toString(36).slice(2, 10)
    );
  }

  getTypeIcon(tipo: TaskType): string {
    const icons = {
      trabajo: 'briefcase',
      casa: 'home',
      negocios: 'business'
    };
    return icons[tipo] || 'pricetag';
  }

  getTypeBadgeColor(tipo: TaskType): string {
    const colors = {
      trabajo: 'primary',
      casa: 'success',
      negocios: 'tertiary'
    };
    return colors[tipo] || 'medium';
  }

}
