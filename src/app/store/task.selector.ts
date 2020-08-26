import { createSelector, createFeatureSelector } from '@ngrx/store';
import { taskAdapter, TaskState } from './task.reducer';

export const { selectAll } = taskAdapter.getSelectors();

export const selectTaskState = createFeatureSelector<TaskState>('task');

export const selectAllTask = createSelector(
  selectTaskState,
  selectAll
);


