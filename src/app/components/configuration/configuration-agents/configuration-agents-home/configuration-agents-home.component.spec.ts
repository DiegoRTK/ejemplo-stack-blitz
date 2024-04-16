import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationAgentsHomeComponent } from './configuration-agents-home.component';

describe('ConfigurationAgentsHomeComponent', () => {
  let component: ConfigurationAgentsHomeComponent;
  let fixture: ComponentFixture<ConfigurationAgentsHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigurationAgentsHomeComponent]
    });
    fixture = TestBed.createComponent(ConfigurationAgentsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
