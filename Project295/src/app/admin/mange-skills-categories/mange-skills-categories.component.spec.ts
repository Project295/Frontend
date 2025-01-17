import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangeSkillsCategoriesComponent } from './mange-skills-categories.component';

describe('MangeSkillsCategoriesComponent', () => {
  let component: MangeSkillsCategoriesComponent;
  let fixture: ComponentFixture<MangeSkillsCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MangeSkillsCategoriesComponent]
    });
    fixture = TestBed.createComponent(MangeSkillsCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
