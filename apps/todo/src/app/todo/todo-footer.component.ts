import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { TodoFilter } from './todo';

@Component({
  selector: 'app-todo-footer[currentFilter]',
  template: `
    <footer id="footer" class="footer">
      <span id="todo-count" class="todo-count">
        {{ incompleteTodosCount }} items left
      </span>
      <ul id="filters" class="filters">
        <li>
          <a
            [routerLink]=""
            [class.selected]="currentFilter === 'SHOW_ALL'"
            (click)="filter.emit('SHOW_ALL')"
          >
            All
          </a>
        </li>
        <li>
          <a
            [routerLink]=""
            [class.selected]="currentFilter === 'SHOW_ACTIVE'"
            (click)="filter.emit('SHOW_ACTIVE')"
          >
            Active
          </a>
        </li>
        <li>
          <a
            [routerLink]=""
            [class.selected]="currentFilter === 'SHOW_COMPLETED'"
            (click)="filter.emit('SHOW_COMPLETED')"
          >
            Completed
          </a>
        </li>
      </ul>
      <button
        id="clear-completed"
        *ngIf="hasCompletedTodos"
        class="clear-completed"
        (click)="clearCompleted.emit()"
      >
        Clear completed
      </button>
    </footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoFooterComponent {
  @Input() hasCompletedTodos = false;
  @Input() incompleteTodosCount = 0;
  @Input() currentFilter!: TodoFilter;
  @Output() filter = new EventEmitter<TodoFilter>();
  @Output() clearCompleted = new EventEmitter();
}
