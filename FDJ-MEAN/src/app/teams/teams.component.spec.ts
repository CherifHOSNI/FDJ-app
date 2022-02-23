import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TeamsComponent } from './teams.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Team } from '../shared/interfaces/team';
import { TeamsService } from '../services/teams/teams.service';

describe('TeamsComponent', () => {
  let component: TeamsComponent;
  let fixture: ComponentFixture<TeamsComponent>;
  let service: TeamsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [TeamsService],
      declarations: [TeamsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsComponent);
    service = TestBed.inject(TeamsService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('expect selected team tobe team', () => {
    let team: Team = {
      _id: '5d2d01fdda07b95bb8f16f0a',
      name: 'Arsenal',
      thumbnail:
        'https://www.thesportsdb.com//images//media//team//badge//a1af2i1557005128.png',
      players: ['5d2d058cda07b95bb8f16f80', '5d2d0653da07b95bb8f16fa8'],
    };
    component.setSelectTedTeam(team);
    console.log(service.getSelectedTeam());
    expect(service.getSelectedTeam()).toBe(team);
  });
});
