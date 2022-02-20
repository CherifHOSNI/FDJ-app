import { Component } from '@angular/core';
import { LeaguesService } from '../services/leagues/leagues.service';
import { TeamsService } from '../services/teams/teams.service';
import { League } from '../shared/interfaces/league';
import { Team } from '../shared/interfaces/team';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  leagues: Array<League> = [];
  teams: Array<Team> = [];
  hasQuery: Boolean = false;
  selectLeagueName: string = "";
  leagueNameSelected = false;

  constructor(private leaguesService: LeaguesService, private teamsService: TeamsService) {
    if (this.leaguesService.getSelectedLeague()) {
      console.log(this.leaguesService.getSelectedLeague().name)
      this.selectLeagueName = this.leaguesService.getSelectedLeague().name;
      this.recupTeams(this.leaguesService.getSelectedLeague());
    }
  }



  sendData(event: any) {
    let query: string = event.target.value;

    if (query != this.selectLeagueName) {
      this.leagueNameSelected = false;
    }
    let matchSpaces: any = query.match(/\s*/);
    if (matchSpaces[0] === query) {
      this.leagues = [];
      this.hasQuery = false;
      return;
    }

    this.leaguesService.searchLeagues(query.trim()).subscribe(results => {
      this.leagues = results;
      this.hasQuery = true;
    });
  }

  recupTeams(league: League) {
    this.selectLeagueName = league.name;
    this.leagueNameSelected = true;
    this.leaguesService.setSelectedLeague(league)
    this.teamsService.searchTeams(league.teams).subscribe(results => {
      this.teams = results;
    });
  }

  reset() {
    this.selectLeagueName = ""
    this.leagueNameSelected = false;
  }

}
