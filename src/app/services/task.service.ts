import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

const STORAGE_KEY = 'tasks';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private getTasksFromStorage(): Task[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  private saveTasksToStorage(tasks: Task[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }

  getTasks(): Task[] {
    return this.getTasksFromStorage();
  }

  getTaskById(id: string): Task | undefined {
    return this.getTasksFromStorage().find(t => t.id === id);
  }

  addTask(task: Task) {
    const tasks = this.getTasksFromStorage();
    tasks.push(task);
    this.saveTasksToStorage(tasks);
  }

  updateTask(updatedTask: Task) {
    const tasks = this.getTasksFromStorage().map(task =>
      task.id === updatedTask.id ? updatedTask : task
    );
    this.saveTasksToStorage(tasks);
  }

  deleteTask(id: string) {
    const tasks = this.getTasksFromStorage().filter(task => task.id !== id);
    this.saveTasksToStorage(tasks);
  }
}
