import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  NgModule,
  OnInit,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { LatestPipe } from '@component-first/redux';
import { TodoFilter } from './todo';
import { TodoFooterComponent } from './todo-footer.component';
import { TodoInputComponent } from './todo-input.component';
import { TodoItemComponent } from './todo-item.component';
import { TodoListComponent } from './todo-list.component';
import { TodoStore } from './todo.store';

@Component({
  selector: 'app-todo-redux',
  template: `
    <header class="header">
      <h1>todos</h1>
      <app-todo-input
        *ngIf="!(todoStore.selectors.loading | latest); else loading"
        (addTodo)="onAddTodo($event)"
      ></app-todo-input>
    </header>
    <app-todo-list
      *ngIf="todoStore.selectors.hasTodo | latest"
      [todos]="todoStore.selectors.filteredTodos | latest"
      (toggle)="onToggle($event.id)"
      (update)="onUpdate($event)"
      (delete)="onDelete($event.id)"
    ></app-todo-list>
    <app-todo-footer
      *ngIf="todoStore.selectors.hasTodo | latest"
      [hasCompletedTodos]="todoStore.selectors.hasCompletedTodo | latest"
      [incompleteTodosCount]="todoStore.selectors.incompleteTodosCount | latest"
      [currentFilter]="todoStore.selectors.filter | latest"
      (filter)="onFilter($event)"
      (clearCompleted)="onClearCompleted()"
    ></app-todo-footer>

    <ng-template #loading>
      <div>loading...</div>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TodoStore],
})
export class TodoReduxComponent implements OnInit {
  constructor(private cdr: ChangeDetectorRef, public todoStore: TodoStore) {}

  ngOnInit() {
    this.todoStore.initialize(this.cdr);
  }

  onAddTodo(newTodo: string) {
    this.todoStore.dispatchAction(this.todoStore.actions.addTodo, { newTodo });
  }

  onToggle(id: number) {
    this.todoStore.dispatchAction(this.todoStore.actions.toggle, { id });
  }

  onUpdate($event: { id: number; text: string }) {
    this.todoStore.dispatchAction(this.todoStore.actions.update, $event);
  }

  onDelete(id: number) {
    this.todoStore.dispatchAction(this.todoStore.actions.delete, { id });
  }

  onFilter(filter: TodoFilter) {
    this.todoStore.dispatchAction(this.todoStore.actions.setFilter, { filter });
  }

  onClearCompleted() {
    this.todoStore.dispatchAction(this.todoStore.actions.clearCompleted);
  }
}

@NgModule({
  declarations: [
    TodoReduxComponent,
    TodoListComponent,
    TodoItemComponent,
    TodoInputComponent,
    TodoFooterComponent,
    LatestPipe,
  ],
  imports: [
    RouterModule.forChild([{ path: '', component: TodoReduxComponent }]),
    CommonModule,
  ],
})
export class TodoReduxComponentModule {}
