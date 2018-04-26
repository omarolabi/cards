/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FactionsService } from './factions.service';

describe('Service: Faction', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FactionsService]
    });
  });

  it('should ...', inject([FactionsService], (service: FactionsService) => {
    expect(service).toBeTruthy();
  }));
});
