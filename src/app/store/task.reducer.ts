import { TaskAction, TaskActionType } from './task.action';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Task } from '../task.model';

export const taskAdapter: EntityAdapter<Task> = createEntityAdapter<Task>({
  selectId: (task: Task) => task.id
});

export const initialTaskState: TaskState = taskAdapter.getInitialState({
  loading: true,
});

export interface TaskState extends EntityState<Task> {
  loading: boolean;
}

export function taskReducer(state = initialTaskState, action: TaskAction): TaskState {
  switch (action.type) {
    case TaskActionType.LoadSuccess: {
      return taskAdapter.addAll(action.payload, {
        ...state,
        loading: false,
      });
    }
    default:
      return state;
  }
}
