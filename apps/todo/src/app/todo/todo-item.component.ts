import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Todo } from './todo';

@Component({
  selector: 'app-todo-item[todo]',
  template: `
    <li [class.completed]="todo.completed" [class.editing]="editing">
      <div class="view">
        <input
          class="toggle"
          type="checkbox"
          [checked]="todo.completed"
          (click)="toggle.emit(todo.id)"
        />
        <label (dblclick)="activeEditMode()">
          {{ todo.text }}
        </label>
        <button class="destroy" (click)="delete.emit(todo.id)"></button>
      </div>
      <input
        class="edit"
        type="text"
        #textInput
        [hidden]="editing"
        [value]="todo.text"
        (keyup.enter)="updateText(todo.id, textInput.value)"
        (blur)="updateText(todo.id, textInput.value)"
      />
    </li>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() toggle = new EventEmitter<number>();
  @Output() update = new EventEmitter<{ id: number; text: string }>();
  @Output() delete = new EventEmitter<number>();

  // 'local state is fine'
  editing = false;

  updateText(todoId: number, text: string): void {
    if (text && text.trim() !== this.todo?.text) {
      this.update.emit({ id: todoId, text: text.trim() });
    }
    this.editing = false;
  }

  activeEditMode(): void {
    this.editing = true;
  }
}
