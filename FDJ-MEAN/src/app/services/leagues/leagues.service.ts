import { Injectable } from '@angular/core';
import { League } from '../../shared/interfaces/league';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LeaguesService {
  selectedLeague: any;
  constructor(private http: HttpClient) {}

  searchLeagues(query: string) {
    return this.http
      .post<{ payload: Array<League> }>(
        '/api/getLeagues',
        { payload: query },
        { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
      )
      .pipe(map((data) => data.payload));
  }
  setSelectedLeague(team: League) {
    this.selectedLeague = team;
  }
  getSelectedLeague(): League {
    return this.selectedLeague;
  }
}
