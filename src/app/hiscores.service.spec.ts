import { TestBed } from '@angular/core/testing';

import { HiscoresService } from './hiscores.service';

describe('HiscoresService', () => {
  let service: HiscoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HiscoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
