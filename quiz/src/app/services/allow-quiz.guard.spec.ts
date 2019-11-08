import { TestBed, async, inject } from '@angular/core/testing';

import { AllowQuizGuard } from './allow-quiz.guard';

describe('AllowQuizGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AllowQuizGuard]
    });
  });

  it('should ...', inject([AllowQuizGuard], (guard: AllowQuizGuard) => {
    expect(guard).toBeTruthy();
  }));
});
