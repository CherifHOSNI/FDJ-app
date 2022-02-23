import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { map, mergeMap } from 'rxjs';
import { PlayersService } from '../services/players/players.service';
import { TeamsService } from '../services/teams/teams.service';
import { Player } from '../shared/interfaces/player';
import { Team } from '../shared/interfaces/team';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css'],
})
export class PlayersComponent implements OnInit, AfterViewInit {
  teamId: any;
  playersIdList: string[] = [];
  players: Player[] = [];
  selectedTeam: Team;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private playersService: PlayersService,
    private teamsService: TeamsService
  ) {
    this.selectedTeam = this.teamsService.getSelectedTeam();
    if (!this.selectedTeam) {
      this.router.navigate(['/Home']);
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.teamId = params.get('_id');
    });
  }
  ngAfterViewInit(): void {
    this.playersService
      .searchPlayersByTeamID(this.teamId)
      .subscribe((results) => {
        this.playersIdList = results;

        this.playersService
          .searchPlayers(this.playersIdList)
          .subscribe((results) => {
            this.players = results;
          });
      });
  }
  goBack() {
    this.router.navigate(['Home']);
  }
}
