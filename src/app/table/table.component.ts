import {
  CdkDragStart,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { FormControl } from '@angular/forms';
import 'hammerjs';
import { Task } from '../task.model';
import { GlobalState } from '../store';
import { TaskLoadAction } from '../store/task.action';
import { Store, select } from '@ngrx/store';
import { selectAllTask } from '../store/task.selector';
import { Subscription } from 'rxjs';

@Component({
  selector: 'tasks-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnDestroy {
  private subs: Subscription[] = [];

  @ViewChild(MatSort) sort: MatSort;

  public columns: any[] = [
    { field: 'title', filter: '' },
    { field: 'body', filter: '' },
    { field: 'points', filter: '' },
    { field: 'progress', filter: '' },
  ];
  public columnNames: string[] = ['title', 'body', 'points', 'progress'];
  public rows: MatTableDataSource<Task>;
  public filters = {
    title: { control: new FormControl(), value: '' },
    body: { control: new FormControl(), value: '' },
    points: { control: new FormControl(), value: '' },
    progress: { control: new FormControl(), value: '' },
  };

  private previousIndex: number;

  constructor(public store: Store<GlobalState>) {}

  public ngOnInit() {
    const sub = this.store
      .pipe(select(selectAllTask))
      .subscribe((tasks: Task[]) => {
        this.rows = new MatTableDataSource(tasks);
      });
    this.subs.push(sub);
    this.store.dispatch(new TaskLoadAction()); // Pass parameters for serverside pagination.
    this.rows.sort = this.sort;
    this.setFilters();
  }

  ngOnDestroy() {
    this.subs.forEach((s) => s.unsubscribe());
  }

  public drag(event: CdkDragStart, index: number) {
    this.previousIndex = index;
  }

  public drop(event: CdkDropList, index: number) {
    if (event) {
      moveItemInArray(this.columns, this.previousIndex, index);
      this.columnNames = this.columns.map((c) => c.field);
    }
  }

  private setFilters() {
    Object.keys(this.filters).forEach((filter) => {
      const sub = this.filters[filter].control.valueChanges.subscribe(
        (value) => {
          this.filters[filter].value = value;
          this.rows.filter = JSON.stringify(
            Object.keys(this.filters).map((f) => {
              return { field: f, value: this.filters[f].value };
            })
          );
        }
      );
      this.subs.push(sub);
    });

    this.rows.filterPredicate = (data: any, filter: string): boolean => {
      const filterValues = JSON.parse(filter).filter((f) => f.value !== '');
      let found = true;
      filterValues.forEach((f) => {
        const v = `${data[f.field]}`;
        if (v.toLowerCase().indexOf(f.value.toLowerCase()) === -1) {
          found = false;
        }
      });
      return found;
    };
  }
}
