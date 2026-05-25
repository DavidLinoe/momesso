import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Auth } from '../models/auth.model';
import { ResponseApi } from '../../../utils/types/apiResponse';

const selectTodoState = createFeatureSelector<ResponseApi<Auth>>('auth');

export const items = createSelector(selectTodoState, (state) => state.data);

export const message = createSelector(selectTodoState, (state) => state.message);

export const count = createSelector(selectTodoState, (state) => state.count);

export const loading = createSelector(selectTodoState, (state) => state.loading);

export const error = createSelector(selectTodoState, (state) => state.error);

export const status = createSelector(selectTodoState, (state) => state.statusCode);
