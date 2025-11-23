import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Post, PostsServices } from '../../services/posts-services';

import { Toast } from '../../services/toast';

@Component({
  selector: 'app-posts-update',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './posts-update.html',
  styleUrl: './posts-update.css'
})
export class PostsUpdate implements OnInit {
  activeModal = inject(NgbActiveModal);
  private postService = inject(PostsServices);
  private toastService = inject(Toast);
  private fb = inject(FormBuilder);

  // Recebe o post que foi clicado lá na lista
  @Input() post!: Post;

  form: FormGroup = this.fb.group({
    title: ['', Validators.required],
    body: ['', Validators.required]
  });

  // Esse método roda assim que o componente é criado
  ngOnInit(): void {
    // Se recebemos um post, preenchemos o formulário com os dados dele
    if (this.post) {
      this.form.patchValue({
        title: this.post.title,
        body: this.post.body
      });
    }
  }

  update() {
    if (this.form.invalid) return;

    // Chamamos o serviço de update passando o ID e os novos dados
    this.postService.update(this.post.id!, this.form.value).subscribe({
      next: (res) => {
        this.toastService.showSuccess('Post atualizado com sucesso!');
        
        // Retornamos para a lista o post original mesclado com as alterações
        // Isso garante que a lista atualize visualmente sem precisar recarregar tudo
        this.activeModal.close({ ...this.post, ...res }); 
      },
      error: (err) => {
        console.error(err);
        this.toastService.showDanger('Erro ao atualizar o post.');
      }
    });
  }
}