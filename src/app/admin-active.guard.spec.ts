import { TestBed } from '@angular/core/testing';

import { AdminActiveGuard } from './admin-active.guard';

describe('AdminActiveGuard', () => {
  let guard: AdminActiveGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminActiveGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
