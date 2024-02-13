import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { wishlistGuard } from './wishlist.guard';

describe('wishlistGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => wishlistGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
