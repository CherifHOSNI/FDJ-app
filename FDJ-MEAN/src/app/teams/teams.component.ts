import { Component, Input } from '@angular/core';
import { Team } from '../shared/interfaces/team';
import { Router } from '@angular/router';
import { TeamsService } from '../services/teams/teams.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
})
export class TeamsComponent {
  @Input() teamsList: Team[] = [];

  constructor(private router: Router, private teamsService: TeamsService) {}

  setSelectTedTeam(team: Team) {
    this.teamsService.setSelectedTeam(team);
    this.router.navigate(['/team/' + team._id]);
  }
}
