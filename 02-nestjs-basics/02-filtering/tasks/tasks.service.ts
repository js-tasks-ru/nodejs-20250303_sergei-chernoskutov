import { Injectable } from "@nestjs/common";
import { Task, TaskStatus, TaskSortedFields } from "./task.model";
import { GetTasksQueryParamsModel } from "./getTasksQueryParams.model";

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: "1",
      title: "Task 1",
      description: "First task",
      status: TaskStatus.PENDING,
    },
    {
      id: "2",
      title: "Task 2",
      description: "Second task",
      status: TaskStatus.IN_PROGRESS,
    },
    {
      id: "3",
      title: "Task 3",
      description: "Third task",
      status: TaskStatus.COMPLETED,
    },
    {
      id: "4",
      title: "Task 4",
      description: "Fourth task",
      status: TaskStatus.PENDING,
    },
    {
      id: "5",
      title: "Task 5",
      description: "Fifth task",
      status: TaskStatus.IN_PROGRESS,
    },
  ];

  getFilteredTasks(query: GetTasksQueryParamsModel): Task[] {
    let result: Task[] = query.status
      ? this.tasks.filter((task) => task.status === query.status)
      : this.tasks;

    if (query.sortBy) {
      result = this.getSortedTasks(result, query.sortBy);
    }

    if (query.page && query.limit) {
      const startIndex = query.page * query.limit - query.limit;
      result = result.slice(startIndex, startIndex + query.limit);
    }

    return result;
  }

  private getSortedTasks(tasks: Task[], sortBy: TaskSortedFields) {
    function sortByStatus(tasks: Task[]) {
      const statusOrder = {
        [TaskStatus.COMPLETED]: 1,
        [TaskStatus.IN_PROGRESS]: 2,
        [TaskStatus.PENDING]: 3,
      };

      return tasks.toSorted(
        (a, b) => statusOrder[a.status] - statusOrder[b.status],
      );
    }

    function sortByTitle(tasks: Task[]) {
      return tasks.toSorted((task1: Task, task2: Task) =>
        task1.title >= task2.title ? 1 : -1,
      );
    }

    return {
      [TaskSortedFields.STATUS]: sortByStatus,
      [TaskSortedFields.TITLE]: sortByTitle,
    }[sortBy](tasks);
  }
}
