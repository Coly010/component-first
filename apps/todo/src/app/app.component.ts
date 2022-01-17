import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <section class="todoapp">
      <router-outlet></router-outlet>
    </section>
    <footer class="info">
      <p>Double-click to edit a todo</p>
      <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
    </footer>
  `,
  styles: [],
})
export class AppComponent {
  title = 'todo';
}
