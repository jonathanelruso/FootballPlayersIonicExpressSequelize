import { TestBed } from '@angular/core/testing';

import { FootballPlayerService } from './football-player-service';

describe('FootballPlayerService', () => {
  let service: FootballPlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FootballPlayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
