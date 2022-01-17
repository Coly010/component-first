import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Todo } from './todo';

@Injectable({ providedIn: 'root' })
export class TodoService {
  constructor(private readonly http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>('assets/todos.json').pipe(
      map((data) =>
        data.map((x) => ({
          id: x.id,
          text: x.text,
          creationDate: new Date(x.creationDate),
          completed: x.completed,
        }))
      )
    );
  }
}
