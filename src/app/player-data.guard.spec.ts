import { TestBed } from '@angular/core/testing';

import { PlayerDataGuard } from './player-data.guard';

describe('PlayerDataGuard', () => {
  let guard: PlayerDataGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PlayerDataGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
