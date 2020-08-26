import { Action } from '@ngrx/store';
import { TaskParams, Task } from '../task.model';

export enum TaskActionType {
  Loading = '[Task] Loading',
  LoadSuccess = '[Task] LoadSuccess',
}

export class TaskLoadAction implements Action {
  public readonly type = TaskActionType.Loading;
  constructor(public payload?: TaskParams) {}
}

export class TaskLoadSuccessAction implements Action {
  public readonly type = TaskActionType.LoadSuccess;
  constructor(public payload: Task[]) {}
}

export type TaskAction = TaskLoadAction | TaskLoadSuccessAction;
