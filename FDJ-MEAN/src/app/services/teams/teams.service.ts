import { Injectable } from '@angular/core';
import { Team } from '../../shared/interfaces/team';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  selectedTeam: any;
  constructor(private http: HttpClient) {}

  searchTeams(query: string[]) {
    return this.http
      .post<{ payload: Array<Team> }>(
        '/api/getTeams',
        { payload: query },
        { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
      )
      .pipe(map((data) => data.payload));
  }

  setSelectedTeam(team: Team) {
    this.selectedTeam = team;
  }
  getSelectedTeam(): Team {
    return this.selectedTeam;
  }
}
