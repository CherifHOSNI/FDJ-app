import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { LeaguesService } from './leagues.service';
import { League } from 'src/app/shared/interfaces/league';

describe('LeaguesService', () => {
  let service: LeaguesService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LeaguesService],
    });
    service = TestBed.inject(LeaguesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpTestingController.verify();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('setSelectedLeague should set league', () => {
    let league: League = {
      _id: '5d2cdcf7da07b95bb8f16ed1',
      name: 'English Premier League',
      sport: 'soccer',
      teams: [
        '5d2d01fdda07b95bb8f16f0a',
        '5d2d02d7da07b95bb8f16f2a',
        '5d2d8f60da07b95bb8f17170',
      ],
    };
    service.setSelectedLeague(league);
    expect(service.selectedLeague).toEqual(league);
  });
  it('getSelectedLeague should return selected league', () => {
    let league: League = {
      _id: '5d2cdcf7da07b95bb8f16ed1',
      name: 'English Premier League',
      sport: 'soccer',
      teams: [
        '5d2d01fdda07b95bb8f16f0a',
        '5d2d02d7da07b95bb8f16f2a',
        '5d2d8f60da07b95bb8f17170',
      ],
    };
    service.setSelectedLeague(league);
    expect(service.getSelectedLeague()).toEqual(league);
  });
  it('searchLeagues should return league by ID', () => {
    let leagueID = '5d2cdcf7da07b95bb8f16ed1';
    let League: League[] = [
      {
        _id: '5d2cdcf7da07b95bb8f16ed1',
        name: 'English Premier League',
        sport: 'soccer',
        teams: [
          '5d2d01fdda07b95bb8f16f0a',
          '5d2d02d7da07b95bb8f16f2a',
          '5d2d8f60da07b95bb8f17170',
        ],
      },
    ];
    service.searchLeagues(leagueID).subscribe((results) => {});
    const req = httpTestingController.expectOne('/api/getLeagues');
    req.flush(League);
    expect(req.request.method).toBe('POST');
    expect(League).toEqual([
      {
        _id: '5d2cdcf7da07b95bb8f16ed1',
        name: 'English Premier League',
        sport: 'soccer',
        teams: [
          '5d2d01fdda07b95bb8f16f0a',
          '5d2d02d7da07b95bb8f16f2a',
          '5d2d8f60da07b95bb8f17170',
        ],
      },
    ]);
  });
});
