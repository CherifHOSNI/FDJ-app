import { AfterViewInit, Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PlayersService } from '../services/players/players.service';
import { TeamsService } from '../services/teams/teams.service';
import { Player } from '../shared/interfaces/player';
import { Team } from '../shared/interfaces/team';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css'],
})
export class PlayersComponent implements OnInit, AfterViewInit, OnDestroy {
  teamId: any;
  playersIdList: string[] = [];
  players: Player[] = [];
  selectedTeam: Team;
  playerSubscription1: Subscription | any;
  playerSubscription2: Subscription | any;

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
  /**recupere le team id from url */
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.teamId = params.get('_id');
    });
  }
  /** recuperer liste des players*/
  ngAfterViewInit(): void {
    this.playerSubscription1 = this.playersService
      .searchPlayersByTeamID(this.teamId)
      .subscribe((results) => {
        this.playersIdList = results;
        this.playerSubscription2 = this.playersService
          .searchPlayers(this.playersIdList)
          .subscribe((results) => {
            this.players = results;
          });
      });
  }
  /** retour à la page Home */
  goBack() {
    this.router.navigate(['Home']);
  }
  /** unsubscribe from obesrvables */
  ngOnDestroy() {
    this.playerSubscription1?.unsubscribe();
    this.playerSubscription2?.unsubscribe();
  }
}
