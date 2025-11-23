import { Component, inject, OnInit, signal } from '@angular/core';
import { NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PostsCreate } from '../posts-create/posts-create';
import { PostsUpdate } from '../posts-update/posts-update';
import { PostsDelete } from '../posts-delete/posts-delete';
import { SlicePipe } from '@angular/common';
import { Post, PostsServices } from '../../services/posts-services';


@Component({
  selector: 'app-posts-list',
  imports: [NgbDropdownModule, SlicePipe],
  templateUrl: './posts-list.html',
  styleUrl: './posts-list.css',
})
export class PostsList implements OnInit{
  private readonly modalService = inject(NgbModal);
  private readonly postsService = inject(PostsServices);

  // armazena a lista de posts e reage a mudanças
  posts = signal<Post[]>([]);

  ngOnInit(): void {
    this.leadPosts();
  }

  leadPosts() {
    this.postsService.getAll().subscribe({
      next: (res: any) => {
        this.posts.set(res.posts);
      },
      error: (err) => console.error('Erro ao carregar posts', err)
    });
  }

  openModalCreate() {
    const modalRef = this.modalService.open(PostsCreate, { size: 'lg' });

    // quando omodal fechar com sucesso, ele retorna o novo post
    modalRef.result.then(
      (newPost: Post) => {
        if (newPost) {
          //adiciona um novo post no inicio da lista
          this.posts.update(currentPosts => [newPost, ...currentPosts]);
        }
      },
      () => {}
    );
  }

  openModalUpdate(post: Post) {
    const modalRef = this.modalService.open(PostsUpdate, { size: 'lg' });
    modalRef.componentInstance.post = post;

    modalRef.result.then(
      (updatedPost: Post) => {
        if (updatedPost) {
          this.posts.update(currentPosts => 
            currentPosts.map(p => p.id === updatedPost.id ? updatedPost: p)
          );
        }
      },
      () => {}
    );
  }

  openModalDelete(post: Post) {
    const modalRef = this.modalService.open(PostsDelete, { size: 'lg' });
    modalRef.componentInstance.post= post;

    modalRef.result.then(
      (deletedId: number) => {
        if (deletedId) {
          // Remove o post da lista
          this.posts.update(currentPosts => currentPosts.filter(p => p.id !== deletedId));
        }
      },
      () => {}
    );
  }  
}
