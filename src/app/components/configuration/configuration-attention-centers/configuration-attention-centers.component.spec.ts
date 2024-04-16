import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationAttentionCentersComponent } from './configuration-attention-centers.component';

describe('ConfigurationAttentionCentersComponent', () => {
  let component: ConfigurationAttentionCentersComponent;
  let fixture: ComponentFixture<ConfigurationAttentionCentersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigurationAttentionCentersComponent]
    });
    fixture = TestBed.createComponent(ConfigurationAttentionCentersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
