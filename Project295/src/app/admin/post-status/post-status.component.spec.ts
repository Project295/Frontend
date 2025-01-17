import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostStatusComponent } from './post-status.component';

describe('PostStatusComponent', () => {
  let component: PostStatusComponent;
  let fixture: ComponentFixture<PostStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostStatusComponent]
    });
    fixture = TestBed.createComponent(PostStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
