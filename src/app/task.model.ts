export interface Task {
    id: string;
    title: string;
    body: string;
    points: number;
    progress: string;
}

export interface TaskParams {
    filter: string;
    sortDirection: 'asc' | 'desc'| '';
    sortField: string;
    pageIndex: number;
    pageSize: number;
  }

export interface TaskResponse {
  total: number;
  tasks: Task[];
}
