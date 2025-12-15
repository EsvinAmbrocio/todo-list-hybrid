import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.page.html',
  styleUrls: ['./task-detail.page.scss'],
  standalone: false,
})
export class TaskDetailPage {
  task?: Task;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {}

  ionViewWillEnter() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.task = this.taskService.getTaskById(id);
    }
  }

  async markCompleted() {
    if (!this.task) return;
    this.taskService.updateTask({ ...this.task, completada: true });
    this.presentToast('Tarea marcada como completada');
    this.router.navigate(['/home']);
  }

  async deleteTask() {
    if (!this.task) return;
    const alert = await this.alertCtrl.create({
      header: 'Eliminar',
      message: '¿Deseas eliminar esta tarea?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.taskService.deleteTask(this.task!.id);
            this.presentToast('Tarea eliminada');
            this.router.navigate(['/home']);
          },
        },
      ],
    });
    await alert.present();
  }

  private async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 1500 });
    await toast.present();
  }

  getTypeIcon(tipo: string): string {
    const icons: { [key: string]: string } = {
      trabajo: 'briefcase',
      casa: 'home',
      negocios: 'business'
    };
    return icons[tipo] || 'pricetag';
  }

  getTypeBadgeColor(tipo: string): string {
    const colors: { [key: string]: string } = {
      trabajo: 'primary',
      casa: 'success',
      negocios: 'tertiary'
    };
    return colors[tipo] || 'medium';
  }
}
