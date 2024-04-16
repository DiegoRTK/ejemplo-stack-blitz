import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationAdministratorsComponent } from './configuration-administrators.component';

describe('ConfigurationAdministratorsComponent', () => {
  let component: ConfigurationAdministratorsComponent;
  let fixture: ComponentFixture<ConfigurationAdministratorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigurationAdministratorsComponent]
    });
    fixture = TestBed.createComponent(ConfigurationAdministratorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
