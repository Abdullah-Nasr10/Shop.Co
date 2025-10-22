import { TestBed } from '@angular/core/testing';

import { Favoriteservice } from './favoriteservice';

describe('Favoriteservice', () => {
  let service: Favoriteservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Favoriteservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
