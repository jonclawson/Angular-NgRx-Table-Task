import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task, TaskParams } from './task.model';

const tasks: Task[] = [
  {id: '1', title: 'Install project', body: '', points: 1, progress: 'Done'},
  {id: '2', title: 'Add dependencies', body: '', points: 1, progress: 'Done'},
  {id: '3', title: 'Generate components', body: '', points: 1, progress: 'Done'},
  {id: '4', title: 'Generate service', body: '', points: 1, progress: 'Done'},
  {id: '5', title: 'Generate reducers', body: '', points: 1, progress: 'Done'},
  {id: '6', title: 'Generate Model', body: '', points: 1, progress: 'Done'},
  {id: '7', title: 'Write content', body: '', points: 2, progress: 'Done'},
  {id: '8', title: 'Write component', body: '', points: 5, progress: 'In Progress'},
  {id: '9', title: 'Write service', body: '', points: 3, progress: 'To Do'},
  {id: '10', title: 'Write reducer', body: '', points: 3, progress: 'To Do'},
];
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  public getTasks(params: TaskParams): Observable<Task[]> {
    console.log('service')
    // http.get() here
    return of(tasks);
  }
}
