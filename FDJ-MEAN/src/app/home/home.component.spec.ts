import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HomeComponent } from './home.component';
import { League } from '../shared/interfaces/league';
import { LeaguesService } from '../services/leagues/leagues.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let service: LeaguesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LeaguesService],
      declarations: [HomeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    service = TestBed.inject(LeaguesService);
    component = fixture.componentInstance;
    service.setSelectedLeague({
      _id: '5d2cdcf7da07b95bb8f16ed1',
      name: 'English Premier League',
      sport: 'soccer',
      teams: [
        '5d2d01fdda07b95bb8f16f0a',
        '5d2d02d7da07b95bb8f16f2a',
        '5d2d8f60da07b95bb8f17170',
      ],
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('reset values', () => {
    component.reset();
    expect(component.selectLeagueName).toEqual('');
    expect(component.leagueNameSelected).toBe(true);
  });

  it('should recup team', () => {
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

    component.recupTeams(league);
    expect(component.teams.length).toBe(0);
  });

  it('should send data', () => {
    let event = {
      target: {
        value: 'English Premier League',
      },
    };
    component.sendData(event);
    expect(component.hasQuery).toBe(false);
  });
  it('should display header', () => {
    expect(
      fixture.nativeElement.querySelector('[data-test="header"]')
    ).toBeTruthy();
  });
  it('should display searchbox', () => {
    expect(
      fixture.nativeElement.querySelector('[data-test="input-search"]')
    ).toBeTruthy();
  });
  it('should disapeer if cancel', () => {
    component.leagueNameSelected = true;
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('[data-test="suggestion"]')
    ).toBeTruthy();
  });
  it('should set initial league', () => {
    expect(component.selectLeagueName).toBe('English Premier League');
  });
  it('leagueNameSelected should be false', () => {
    let event = {
      target: {
        value: '',
      },
    };
    component.sendData(event);
    expect(component.leagueNameSelected).toBe(false);
  });
});
