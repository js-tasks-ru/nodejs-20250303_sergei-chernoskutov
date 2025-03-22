import { Injectable } from "@nestjs/common";
import { Task, TaskStatus } from "./task.model";
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
    const filteredTasks: Task[] = query.status
      ? this.tasks.filter((task) => task.status === query.status)
      : this.tasks;

    if (query.page && query.limit) {
      const startIndex = query.page * query.limit - query.limit;
      return filteredTasks.slice(startIndex, startIndex + query.limit);
    }
    return filteredTasks;
  }
}
