import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PlayersService } from './players.service';
import { Player } from 'src/app/shared/interfaces/player';

describe('PlayersService', () => {
  let service: PlayersService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PlayersService],
    });
    service = TestBed.inject(PlayersService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('searchPlayersByTeamID should return players ID', () => {
    let teamID = '5d2d01fdda07b95bb8f16f0a';
    let playersIdList: string[] = ['5d2d0653da07b95bb8f16fa8'];
    service.searchPlayersByTeamID(teamID).subscribe((results) => {});
    const req = httpTestingController.expectOne('/api/getTeamPlayersIDs');
    req.flush(playersIdList);
    expect(req.request.method).toBe('POST');
    expect(playersIdList).toEqual(['5d2d0653da07b95bb8f16fa8']);
  });

  it('searchPlayers should return players from id list', () => {
    let playerIDS = ['5d2d0653da07b95bb8f16fa8', '5d2d058cda07b95bb8f16f80'];
    let playersList: Player[] = [
      {
        _id: '5d2d0653da07b95bb8f16fa8',
        name: 'Mesut Ozil',
        position: 'Midfielder',
        thumbnail:
          'https://www.thesportsdb.com/images/media/player/thumb/g0xlkp1510859385',
        signin: {
          amount: {
            $numberInt: '50',
          },
          currency: 'eur',
        },
        born: '1988-10-16T05:34:19.198+00:00',
      },
      {
        _id: '5d2d058cda07b95bb8f16f80',
        name: 'Pierre-Emerick Aubameyang',
        position: 'Forward',
        thumbnail:
          ' https://www.thesportsdb.com/images/media/player/thumb/fnk3u51520755737.jpg',
        signin: {
          amount: {
            $numberInt: '50',
          },
          currency: 'eur',
        },
        born: '1989-06-19T01:37:19.198+00:00',
      },
    ];
    service.searchPlayers(playerIDS).subscribe((results) => {});
    const req = httpTestingController.expectOne('/api/getPlayers');
    req.flush(playersList);
    expect(req.request.method).toBe('POST');
    expect(playersList).toEqual([
      {
        _id: '5d2d0653da07b95bb8f16fa8',
        name: 'Mesut Ozil',
        position: 'Midfielder',
        thumbnail:
          'https://www.thesportsdb.com/images/media/player/thumb/g0xlkp1510859385',
        signin: {
          amount: {
            $numberInt: '50',
          },
          currency: 'eur',
        },
        born: '1988-10-16T05:34:19.198+00:00',
      },
      {
        _id: '5d2d058cda07b95bb8f16f80',
        name: 'Pierre-Emerick Aubameyang',
        position: 'Forward',
        thumbnail:
          ' https://www.thesportsdb.com/images/media/player/thumb/fnk3u51520755737.jpg',
        signin: {
          amount: {
            $numberInt: '50',
          },
          currency: 'eur',
        },
        born: '1989-06-19T01:37:19.198+00:00',
      },
    ]);
  });
});
