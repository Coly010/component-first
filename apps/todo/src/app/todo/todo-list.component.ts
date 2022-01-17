import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Todo } from './todo';

@Component({
  selector: 'app-todo-list',
  template: `
    <section id="main" class="main">
      <div class="toogle-view" *ngIf="todos.length > 0"></div>
      <ul id="todo-list" class="todo-list">
        <app-todo-item
          *ngFor="let todo of todos; index as i; trackBy: todosTrackByFn"
          [todo]="todo"
          (toggle)="toggle.emit({ id: $event, index: i })"
          (update)="update.emit({ index: i, id: $event.id, text: $event.text })"
          (delete)="delete.emit({ id: $event, index: i })"
        ></app-todo-item>
      </ul>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent {
  @Input() todos: Todo[] = [];
  @Output() toggle = new EventEmitter<{ index: number; id: number }>();
  @Output() update = new EventEmitter<{
    index: number;
    id: number;
    text: string;
  }>();
  @Output() delete = new EventEmitter<{ index: number; id: number }>();

  todosTrackByFn(index: number, item: Todo): number {
    return item.id;
  }
}
