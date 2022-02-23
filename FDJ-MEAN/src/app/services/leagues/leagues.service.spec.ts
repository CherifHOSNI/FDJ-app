import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LeaguesService } from './leagues.service';

describe('LeaguesService', () => {
  let service: LeaguesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LeaguesService],
    });
    service = TestBed.inject(LeaguesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
