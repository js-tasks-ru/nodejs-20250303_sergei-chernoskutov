import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { TasksService }             from "./tasks.service";
import { GetTasksQueryParamsModel } from "./getTasksQueryParams.model";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  getTasks(@Query() query: GetTasksQueryParamsModel) {
    return this.tasksService.getFilteredTasks(query);
  }
}
