import { ChangeDetectorRef, Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@component-first/redux';
import { map, Subject, takeUntil } from 'rxjs';
import { Todo, TodoFilter } from './todo';
import { TodoService } from './todo.service';

export interface TodoState {
  todos: Todo[];
  loading: boolean;
  filter: TodoFilter;
}

@Injectable()
export class TodoStore extends Store<TodoState> implements OnDestroy {
  actions = {
    loadTodo: this.createAction('loadTodo'),
    loadTodoSuccess: this.createAction<{ todos: Todo[] }>('loadTodoSuccess'),
    addTodo: this.createAction<{ newTodo: string }>('newTodo'),
    toggle: this.createAction<{ id: number }>('toggle'),
    delete: this.createAction<{ id: number }>('id'),
    update: this.createAction<{ id: number; text: string }>('update'),
    clearCompleted: this.createAction('clearCompleted'),
    setFilter: this.createAction<{ filter: TodoFilter }>('setFilter'),
    toggleLoading: this.createAction('toggleLoading'),
  };

  selectors = {
    loading: this.select((s) => s.loading),
    filter: this.select((s) => s.filter),
    filteredTodos: this.select(({ filter, todos }) => {
      switch (filter) {
        default:
        case 'SHOW_ALL':
          return todos;
        case 'SHOW_COMPLETED':
          return todos.filter((t) => t.completed);
        case 'SHOW_ACTIVE':
          return todos.filter((t) => !t.completed);
      }
    }),
    hasTodo: this.select((s) => s.todos.length > 0),
    hasCompletedTodo: this.select(
      (s) => s.todos.filter((t) => t.completed).length > 0
    ),
    incompleteTodosCount: this.select(
      (s) => s.todos.filter((t) => !t.completed).length
    ),
  };

  #destroyed = new Subject<void>();

  constructor(
    private todoService: TodoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super();
  }

  initialize(cdr: ChangeDetectorRef) {
    this.init(cdr, { todos: [], loading: false, filter: 'SHOW_ALL' });

    this.#createReducers();
    this.#createEffects();

    this.route.params
      .pipe(
        map(({ filter }): TodoFilter => {
          if (filter === 'active') return 'SHOW_ACTIVE';
          if (filter === 'completed') return 'SHOW_COMPLETED';
          return 'SHOW_ALL';
        }),
        takeUntil(this.#destroyed)
      )
      .subscribe((filter) => {
        this.dispatchAction(this.actions.setFilter, { filter });
      });

    this.dispatchAction(this.actions.loadTodo);

  }

  #createEffects() {
    this.createEffect(this.actions.loadTodo, () => {
      this.todoService
        .getTodos()
        .pipe(takeUntil(this.#destroyed))
        .subscribe((todos) => {
          this.dispatchAction(this.actions.loadTodoSuccess, { todos });
        });
    });

    this.createEffect(this.actions.setFilter, (_, { filter }) => {
      switch (filter) {
        case 'SHOW_ACTIVE': {
          void this.router.navigate(['/', 'active']);
          break;
        }
        case 'SHOW_COMPLETED': {
          void this.router.navigate(['/', 'completed']);
          break;
        }
        default: {
          void this.router.navigate(['/', 'all']);
          break;
        }
      }
    });
  }

  #createReducers() {
    this.createReducer(
      this.actions.loadTodo,
      (state) =>
        ({
          ...state,
          loading: true,
        } as TodoState)
    );
    this.createReducer(
      this.actions.loadTodoSuccess,
      (state, { todos }) =>
        ({
          ...state,
          todos,
          loading: false,
        } as TodoState)
    );
    this.createReducer(this.actions.addTodo, (state, { newTodo }) => ({
      ...state,
      todos: [
        ...state.todos,
        {
          id: Math.random(),
          text: newTodo,
          creationDate: new Date(),
          completed: false,
        },
      ],
    }));
    this.createReducer(this.actions.toggle, (state, { id }) => ({
      ...state,
      todos: state.todos.map((todo) => {
        if (todo.id !== id) return todo;
        return { ...todo, completed: !todo.completed };
      }),
    }));
    this.createReducer(this.actions.delete, (state, { id }) => ({
      ...state,
      todos: state.todos.filter((todo) => todo.id !== id),
    }));
    this.createReducer(this.actions.update, (state, { id, text }) => ({
      ...state,
      todos: state.todos.map((todo) => {
        if (todo.id !== id) return todo;
        return { ...todo, text };
      }),
    }));
    this.createReducer(this.actions.clearCompleted, (state) => ({
      ...state,
      todos: state.todos.filter((todo) => !todo.completed),
    }));
    this.createReducer(this.actions.setFilter, (state, { filter }) => ({
      ...state,
      filter,
    }));
  }

  ngOnDestroy() {
    this.#destroyed.next();
  }
}
