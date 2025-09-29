import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { FootballPlayer } from 'src/models/football-player.model';

@Injectable({
  providedIn: 'root',
})
export class FootballPlayerService {
  endpoint = 'http://localhost:8080/api/football-players';

  constructor(private httpClient: HttpClient) {}

  getFootballPlayers() {
    return this.httpClient.get(this.endpoint);
  }

  addFootballPlayer(footballPlayer: FootballPlayer) {
    return this.httpClient.post(this.endpoint, footballPlayer);
  }

  updateFootballPlayer(id: any, footballPlayer: FootballPlayer) {
    return this.httpClient.put(`${this.endpoint}/${id}`, footballPlayer);
  }

  deleteFootballPlayer(id: any) {
    return this.httpClient.delete(`${this.endpoint}/${id}`);
  }
}
