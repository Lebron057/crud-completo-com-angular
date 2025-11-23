import { Component, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PostsCreate } from '../posts-create/posts-create';
import { PostsUpdate } from '../posts-update/posts-update';
import { PostsDelete } from '../posts-delete/posts-delete';


@Component({
  selector: 'app-posts-list',
  imports: [],
  templateUrl: './posts-list.html',
  styleUrl: './posts-list.css',
})
export class PostsList {
  private readonly modalService = inject(NgbModal);

  openModalCreate() {
    this.modalService.open(PostsCreate, { size: 'lg' });
  }

  openModalUpdate() {
    this.modalService.open(PostsUpdate, { size: 'lg' });
  }

  openModalDelete() {
    this.modalService.open(PostsDelete, { size: 'lg' });
  }
  
}
