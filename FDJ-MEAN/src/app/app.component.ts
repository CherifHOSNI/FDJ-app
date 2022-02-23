import { Component } from '@angular/core';
import { LeaguesService } from './services/leagues/leagues.service';
import { TeamsService } from './services/teams/teams.service';
import { League } from './shared/interfaces/league';
import { Team } from './shared/interfaces/team';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'FDJ-MEAN';

  constructor() {}
}
