import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignMissionsComponent } from './assign-missions.component';

describe('AssignMissionsComponent', () => {
  let component: AssignMissionsComponent;
  let fixture: ComponentFixture<AssignMissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignMissionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AssignMissionsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
