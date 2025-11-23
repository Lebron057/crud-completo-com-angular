import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Post, PostsServices } from '../../services/posts-services';
import { Toast } from '../../services/toast';

@Component({
  selector: 'app-posts-delete',
  standalone: true,
  imports: [],
  templateUrl: './posts-delete.html',
  styleUrl: './posts-delete.css' // Pode manter vazio ou remover se não usar
})
export class PostsDelete {
  activeModal = inject(NgbActiveModal);
  private postService = inject(PostsServices);
  private toastService = inject(Toast);

  // Recebe o post que se deseja excluir
  @Input() post!: Post;

  confirmDelete() {
    // Chama o serviço de delete passando o ID
    this.postService.delete(this.post.id!).subscribe({
      next: () => {
        this.toastService.showSuccess('Post excluído com sucesso!');
        
        // Retorna o ID do post para que a lista saiba qual card remover
        this.activeModal.close(this.post.id); 
      },
      error: (err) => {
        console.error(err);
        this.toastService.showDanger('Erro ao excluir o post.');
      }
    });
  }
}