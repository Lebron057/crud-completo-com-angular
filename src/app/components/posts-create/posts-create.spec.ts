import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsCreate } from './posts-create';

describe('PostsCreate', () => {
  let component: PostsCreate;
  let fixture: ComponentFixture<PostsCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostsCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostsCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
