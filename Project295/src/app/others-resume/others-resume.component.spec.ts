import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OthersResumeComponent } from './others-resume.component';

describe('OthersResumeComponent', () => {
  let component: OthersResumeComponent;
  let fixture: ComponentFixture<OthersResumeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OthersResumeComponent]
    });
    fixture = TestBed.createComponent(OthersResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
