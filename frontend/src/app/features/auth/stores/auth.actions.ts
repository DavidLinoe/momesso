import { createAction, props } from '@ngrx/store';
import { Auth } from '../models/auth.model';
import { ResponseApi } from '../../../utils/types/apiResponse';

export const loadTodos = createAction('[Auth] Load Todos');

export const signIn = createAction(
  '[Auth] Sign In',
  props<{ email: string; password: string }>()
);

export const loadTodosSuccess = createAction(
  '[Auth] Load Todos Success',
  props<{ todos: ResponseApi<Partial<Auth>> }>()
);

export const loadTodosError = createAction(
  '[Auth] Load Todos Failure',
  props<{ error: string }>()
);

export const toggleTodoComplete = createAction(
  '[Auth] Toggle Complete',
  props<{ id: number }>()
);