import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsHomeComponent } from './appointments-home.component';

describe('AppointmentsHomeComponent', () => {
  let component: AppointmentsHomeComponent;
  let fixture: ComponentFixture<AppointmentsHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppointmentsHomeComponent]
    });
    fixture = TestBed.createComponent(AppointmentsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
