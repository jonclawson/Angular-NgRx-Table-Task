import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { TaskActionType, TaskLoadAction, TaskLoadSuccessAction } from './task.action';
import { TaskService } from '../task.service';
import { TaskParams, Task } from '../task.model';

@Injectable()
export class TaskEffects {
  constructor(private service: TaskService, private actions$: Actions) { }

  @Effect()
  public loadTasks$ = this.actions$
    .pipe(ofType<TaskLoadAction>(TaskActionType.Loading),
      map(action => action.payload),
      switchMap((params: TaskParams) =>
        this.service.getTasks(params).pipe(
          map((response: Task[]) => new TaskLoadSuccessAction(response)),
          catchError((error) => of(error)) // Handle error with action
        )
      )
    );
}
