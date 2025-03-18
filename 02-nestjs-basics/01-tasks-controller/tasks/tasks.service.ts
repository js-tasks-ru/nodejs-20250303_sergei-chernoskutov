import { Injectable } from "@nestjs/common";
import { v4 as uuid } from "uuid";
import { Task } from "./task.model";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task | null {
    return this.tasks.find((task) => task.id === id);
  }

  createTask(task: Task): Task {
    const newTask: Task = {
      id: uuid(),
      ...task,
    };
    this.setTasks([...this.tasks, newTask]);
    return newTask;
  }

  updateTask(id: string, update: Task): Task {
    const index = this.tasks.findIndex((task) => task.id === id);
    const tasks = JSON.parse(JSON.stringify(this.tasks));
    tasks[index] = { ...tasks[index], ...update };
    this.setTasks(tasks);

    return tasks[index];
  }

  deleteTask(id: string): Task {
    const task = this.getTaskById(id);
    if (task) {
      this.setTasks(this.tasks.filter((task) => task.id !== id));
    }
    return task;
  }

  private setTasks(tasks: Task[]) {
    this.tasks = tasks;
  }
}
