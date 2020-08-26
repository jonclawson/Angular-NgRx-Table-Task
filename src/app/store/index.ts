import { ActionReducerMap } from '@ngrx/store';
import { taskReducer, TaskState, initialTaskState } from './task.reducer';

export interface GlobalState {
  task: TaskState;
}

export const initialGlobalState: GlobalState = {
  task: initialTaskState
};

export const reducers: ActionReducerMap<GlobalState> = {
  task: taskReducer
};
