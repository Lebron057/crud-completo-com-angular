import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Post {
  id?: number;
  title: string;
  body?: string;
  userId?: number;
  tags?: string[];
}

@Injectable({
  providedIn: 'root',
})
export class PostsServices {
  private api = 'https://dummyjson.com/posts';

  private readonly http = inject(HttpClient);

  getAll(): Observable<any> {
    return this.http.get(`${this.api}`);
  }

  getById(id: number) {
    return this.http.get(`${this.api}/${id}`);
  }

  create(post: Post) {
    return this.http.post(`${this.api}/add`, post);
  }

  update(id: number, post: Partial<Post>) {
    return this.http.put(`${this.api}/${id}`, post);
  }

  delete(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }
}

// put -> troca o objeto inteiro
// patch -> Troca um campo específico