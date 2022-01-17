import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-todo-input',
  template: `
    <input
      id="new-todo"
      class="new-todo"
      type="text"
      autofocus
      placeholder="What needs to be done?"
      #textInput
      (keyup.enter)="newTodo(textInput.value); textInput.value = ''"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoInputComponent {
  @Output() addTodo = new EventEmitter<string>();

  newTodo(text: string): void {
    if (text && text.trim()) {
      this.addTodo.emit(text.trim());
    }
  }
}
