import { Injectable } from '@angular/core';
import { Player } from '../../shared/interfaces/player';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  constructor(private http: HttpClient) {}

  searchPlayers(query: string[]) {
    return this.http
      .post<{ payload: Array<Player> }>(
        '/api/getPlayers',
        { payload: query },
        { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
      )
      .pipe(map((data) => data.payload));
  }
  searchPlayersByTeamID(query: string) {
    return this.http
      .post<{ payload: Array<string> }>(
        '/api/getTeamPlayersIDs',
        { payload: query },
        { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
      )
      .pipe(map((data) => data.payload));
  }
}
