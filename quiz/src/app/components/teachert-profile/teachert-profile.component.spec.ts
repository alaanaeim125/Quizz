import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachertProfileComponent } from './teachert-profile.component';

describe('TeachertProfileComponent', () => {
  let component: TeachertProfileComponent;
  let fixture: ComponentFixture<TeachertProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeachertProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachertProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
