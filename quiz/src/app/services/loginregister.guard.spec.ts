import { TestBed, async, inject } from '@angular/core/testing';

import { LoginregisterGuard } from './loginregister.guard';

describe('LoginregisterGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginregisterGuard]
    });
  });

  it('should ...', inject([LoginregisterGuard], (guard: LoginregisterGuard) => {
    expect(guard).toBeTruthy();
  }));
});
