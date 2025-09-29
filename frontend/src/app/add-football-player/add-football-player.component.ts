import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { FootballPlayer } from 'src/models/football-player.model';

@Component({
  selector: 'app-add-football-player',
  templateUrl: './add-football-player.component.html',
  styleUrls: ['./add-football-player.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, IonicModule],
})
export class AddFootballPlayerComponent implements OnInit {
  @Input() playerData?: FootballPlayer;

  playerForm!: FormGroup;

  constructor(private fb: FormBuilder, private modalCtrl: ModalController) {}

  ngOnInit() {
    this.playerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      age: ['', [Validators.required, Validators.min(15), Validators.max(50)]],
      club: ['', Validators.required],
      position: ['', Validators.required],
    });

    if (this.playerData) {
      this.playerForm.patchValue({
        name: this.playerData.name,
        age: this.playerData.age,
        club: this.playerData.club,
        position: this.playerData.position,
      });
    }
  }

  save() {
    if (this.playerForm.valid) {
      this.modalCtrl.dismiss(this.playerForm.value);
    }
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
