import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PostsServices } from '../../services/posts-services';
import { Toast } from '../../services/toast';

@Component({
  selector: 'app-posts-create',
  standalone: true,
  imports: [ReactiveFormsModule], // Importante para o formulário funcionar
  templateUrl: './posts-create.html',
  styleUrl: './posts-create.css'
})
export class PostsCreate {
  // Injeção de dependências
  activeModal = inject(NgbActiveModal); // Para controlar o fechamento do modal
  private postService = inject(PostsServices);
  private toastService = inject(Toast);
  private fb = inject(FormBuilder);

  // Definição do formulário e suas validações
  form: FormGroup = this.fb.group({
    title: ['', Validators.required], // Campo obrigatório
    body: ['', Validators.required],  // Campo obrigatório
    userId: [1] // A API DummyJSON exige um userId (estamos fixando em 1 para teste)
  });

  save() {
    // Se o formulário estiver inválido (vazio), não faz nada
    if (this.form.invalid) return;

    // Chama o serviço para criar
    this.postService.create(this.form.value).subscribe({
      next: (res) => {
        // Sucesso: Mostra toast verde
        this.toastService.showSuccess('Post criado com sucesso!');
        // Fecha o modal e passa o novo post de volta para a listagem
        this.activeModal.close(res); 
      },
      error: (err) => {
        // Erro: Mostra toast vermelho
        console.error(err);
        this.toastService.showDanger('Erro ao criar post. Tente novamente.');
      }
    });
  }
}