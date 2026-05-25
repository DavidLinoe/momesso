import { inject, Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthApi } from '../apis/auth.api';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadTodos, loadTodosSuccess, loadTodosError, signIn } from './auth.actions';

@Injectable()
export class TodoEffects {
  private actions$ = inject(Actions);
  private authApi = inject(AuthApi);

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTodos),
    //   switchMap(() =>
    //     this.authApi.signIn().pipe(
    //       map((todos) => loadTodosSuccess({ todos })),
    //       catchError((error) => of(loadTodosError({ error: error.message }))),
    //     ),
    //   ),
    ),
  );
  logIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signIn),
      switchMap(({ email, password }) =>
        this.authApi.signIn(email, password).pipe(
          map((todos) => loadTodosSuccess({ todos })),
          catchError((error) => of(loadTodosError({ error: error.message }))),
        ),
      ),
    ),
  );
}