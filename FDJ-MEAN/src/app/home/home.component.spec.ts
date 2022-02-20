import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { HomeComponent } from './home.component';
import { League } from '../shared/interfaces/league';
import { Team } from '../shared/interfaces/team';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],

      declarations: [HomeComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('reset values', () => {
    component.reset()
    expect(component.selectLeagueName).toEqual("");
    expect(component.leagueNameSelected).toBe(false);
  });

  it('should recup team', () => {
    let league: League = {
      _id: "5d2cdcf7da07b95bb8f16ed1",
      name: "English Premier League",
      sport: "soccer",
      teams: ["5d2d01fdda07b95bb8f16f0a", "5d2d02d7da07b95bb8f16f2a", "5d2d8f60da07b95bb8f17170"]
    }

    component.recupTeams(league);
    expect(component.teams.length).toBe(0);
  });

  it('should send data', () => {
    let event = {
      target: {
        value: "English Premier League"
      }
    }
    component.sendData(event);
    expect(component.hasQuery).toBe(false)
  });
});
