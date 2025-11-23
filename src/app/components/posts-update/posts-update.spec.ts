import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsUpdate } from './posts-update';

describe('PostsUpdate', () => {
  let component: PostsUpdate;
  let fixture: ComponentFixture<PostsUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostsUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostsUpdate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
