import { Component, OnInit } from '@angular/core';
import { FootballPlayerService } from '../services/football-player-service';
import { ModalController, ToastController } from '@ionic/angular';
import { AddFootballPlayerComponent } from '../add-football-player/add-football-player.component';
import { FootballPlayer } from 'src/models/football-player.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  footballPlayers: any = [];

  constructor(
    private footballPlayerService: FootballPlayerService,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.getAllFootballPlayers();
  }

  getAllFootballPlayers() {
    this.footballPlayerService.getFootballPlayers().subscribe((response) => {
      this.footballPlayers = response;
    });
  }

  async addPlayerModal() {
    const modal = await this.modalCtrl.create({
      component: AddFootballPlayerComponent,
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();

    if (data) {
      this.footballPlayerService.addFootballPlayer(data).subscribe({
        next: () => {
          this.presentToast('Jugador añadido con éxito', 'success');
          this.getAllFootballPlayers();
        },
        error: (err) => {
          console.error('Error al guardar el jugador', err);
          this.presentToast('Error al guarda el jugador', 'danger');
        },
      });
    }
  }

  async updatePlayer(footballPlayer: FootballPlayer) {
    const modal = await this.modalCtrl.create({
      component: AddFootballPlayerComponent,
      componentProps: {
        playerData: footballPlayer,
      },
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();

    if (data) {
      this.footballPlayerService
        .updateFootballPlayer(footballPlayer.id, data)
        .subscribe({
          next: () => {
            this.presentToast('Jugador actualizado con éxito', 'success');
            this.getAllFootballPlayers();
          },
          error: (err) => {
            console.error('Error al actualizar jugador', err);
            this.presentToast('Error al actualizar jugador', 'danger');
          },
        });
    }
  }

  deletePlayer(id: any) {
    this.footballPlayerService.deleteFootballPlayer(id).subscribe(
      (response) => {
        console.log('Jugador eliminado correctamente', response);
        this.presentToast('Jugador eliminado correctamente', 'success');
        this.getAllFootballPlayers();
      },
      (error) => {
        console.error('Error al eliminar el jugador', error);
        this.presentToast('Error al eliminar el jugador', 'danger');
      }
    );
  }

  async presentToast(message: string, color: string = 'success') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color,
      position: 'top',
    });
    toast.present();
  }
}
