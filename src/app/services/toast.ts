import { Injectable, TemplateRef } from '@angular/core';

export interface Toast {
  templateOrText: string | TemplateRef<any>;
  classname?: string;
  delay?: number;
}

@Injectable({
  providedIn: 'root',
})
export class Toast {
  // lista que armazena os toasts
  toasts: Toast[] = [];

  // método genérico para add um toast
  show( textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ templateOrText: textOrTpl, ...options});
  }

  // remove um toast específico da lista
  remove(toast: Toast) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }

  // atalho para mostrar sucesso
  showSucess(message: string) {
    this.show(message, { classname: 'bg-success text-light', delay: 5000 });
  }

  // atalho para mostrar erro
  showDanger(message: string) {
    this.show(message, { classname: 'bg-danger text-light', delay: 5000 });
  }
}
