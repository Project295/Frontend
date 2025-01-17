import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangeSkillsComponent } from './mange-skills.component';

describe('MangeSkillsComponent', () => {
  let component: MangeSkillsComponent;
  let fixture: ComponentFixture<MangeSkillsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MangeSkillsComponent]
    });
    fixture = TestBed.createComponent(MangeSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
