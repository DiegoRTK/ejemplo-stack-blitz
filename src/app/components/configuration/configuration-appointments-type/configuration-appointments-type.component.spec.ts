import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationAppointmentsTypeComponent } from './configuration-appointments-type.component';

describe('ConfigurationAppointmentsTypeComponent', () => {
  let component: ConfigurationAppointmentsTypeComponent;
  let fixture: ComponentFixture<ConfigurationAppointmentsTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigurationAppointmentsTypeComponent]
    });
    fixture = TestBed.createComponent(ConfigurationAppointmentsTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
