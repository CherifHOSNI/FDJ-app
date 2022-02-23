import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LeaguesService } from '../services/leagues/leagues.service';
import { TeamsService } from '../services/teams/teams.service';
import { League } from '../shared/interfaces/league';
import { Team } from '../shared/interfaces/team';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  leagues: Array<League> = [];
  teams: Array<Team> = [];
  /** boolean pour verifier si il y a des teams dans une league*/
  hasQuery: Boolean = false;
  selectLeagueName: string = '';
  leagueNameSelected = false;
  leagueSubscription: Subscription | any;
  teamSubscription: Subscription | any;

  constructor(
    private leaguesService: LeaguesService,
    private teamsService: TeamsService
  ) {}

  ngOnInit(): void {
    if (this.leaguesService.getSelectedLeague()) {
      this.selectLeagueName = this.leaguesService.getSelectedLeague().name;
      this.recupTeams(this.leaguesService.getSelectedLeague());
    }
  }

  /**methode pour le champ autocomplete @param event*/
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

    this.leagueSubscription = this.leaguesService
      .searchLeagues(query.trim())
      .subscribe((results) => {
        this.leagues = results;
        this.hasQuery = true;
      });
  }
  /** recuperer liste d'equipes dans une league : @param league */
  recupTeams(league: League) {
    this.selectLeagueName = league.name;
    this.leagueNameSelected = true;
    this.leaguesService.setSelectedLeague(league);
    this.teamSubscription = this.teamsService
      .searchTeams(league.teams)
      .subscribe((results) => {
        this.teams = results;
      });
  }
  /**reinitialiser le champs de recherche et ne pas afficher la liste autocomplete */
  reset() {
    this.selectLeagueName = '';
    this.leagueNameSelected = true;
  }
  /** unsubscribe from obesrvables */
  ngOnDestroy() {
    this.leagueSubscription?.unsubscribe();
    this.teamSubscription?.unsubscribe();
  }
}
