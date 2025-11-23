import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsDelete } from './posts-delete';

describe('PostsDelete', () => {
  let component: PostsDelete;
  let fixture: ComponentFixture<PostsDelete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostsDelete]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostsDelete);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
