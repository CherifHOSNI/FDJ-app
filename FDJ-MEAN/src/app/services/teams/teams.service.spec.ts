import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TeamsService } from './teams.service';
import { Team } from 'src/app/shared/interfaces/team';

describe('TeamsService', () => {
  let service: TeamsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TeamsService],
    });
    service = TestBed.inject(TeamsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpTestingController.verify();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('searchTeams should return teams from IDs', () => {
    let teamsIDs = ['5d2d01fdda07b95bb8f16f0a', '5d2d02d7da07b95bb8f16f2a'];
    let teamsList: Team[] = [
      {
        _id: '5d2d01fdda07b95bb8f16f0a',
        name: 'Arsenal',
        thumbnail:
          'https://www.thesportsdb.com//images//media//team//badge//a1af2i1557005128.png',
        players: ['5d2d058cda07b95bb8f16f80', '5d2d0653da07b95bb8f16fa8'],
      },
      {
        _id: '5d2d02d7da07b95bb8f16f2a',
        name: 'Manchester City',
        thumbnail:
          'https://www.thesportsdb.com/images/media/team/badge/vwpvry1467462651.png',
        players: [],
      },
    ];
    service.searchTeams(teamsIDs).subscribe((results) => {
    });
    const req = httpTestingController.expectOne('/api/getTeams');
    req.flush(teamsList);
    expect(req.request.method).toBe('POST');
    expect(teamsList).toEqual([
      {
        _id: '5d2d01fdda07b95bb8f16f0a',
        name: 'Arsenal',
        thumbnail:
          'https://www.thesportsdb.com//images//media//team//badge//a1af2i1557005128.png',
        players: ['5d2d058cda07b95bb8f16f80', '5d2d0653da07b95bb8f16fa8'],
      },
      {
        _id: '5d2d02d7da07b95bb8f16f2a',
        name: 'Manchester City',
        thumbnail:
          'https://www.thesportsdb.com/images/media/team/badge/vwpvry1467462651.png',
        players: [],
      },
    ]);
  });
  it('selectedTeam should be Team', () => {
    let team: Team = {
      _id: '5d2d01fdda07b95bb8f16f0a',
      name: 'Arsenal',
      thumbnail:
        'https://www.thesportsdb.com//images//media//team//badge//a1af2i1557005128.png',
      players: ['5d2d058cda07b95bb8f16f80', '5d2d0653da07b95bb8f16fa8'],
    };
    service.setSelectedTeam(team);
    expect(service.selectedTeam).toEqual(team);
  });

  it('getSelectedTeam should return Team', () => {
    let team: Team = {
      _id: '5d2d01fdda07b95bb8f16f0a',
      name: 'Arsenal',
      thumbnail:
        'https://www.thesportsdb.com//images//media//team//badge//a1af2i1557005128.png',
      players: ['5d2d058cda07b95bb8f16f80', '5d2d0653da07b95bb8f16fa8'],
    };
    service.setSelectedTeam(team);
    expect(service.getSelectedTeam()).toEqual(team);
  });
});
