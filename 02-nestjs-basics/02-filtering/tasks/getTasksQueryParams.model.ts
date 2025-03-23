import {
  IsString,
  IsInt,
  Min,
  IsOptional,
  IsEnum,
} from "class-validator";
import { Type } from "class-transformer";
import { TaskStatus, TaskSortedFields } from "./task.model";

export class GetTasksQueryParamsModel {
  @IsString()
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @IsString()
  @IsEnum(TaskSortedFields)
  @IsOptional()
  sortBy?: TaskSortedFields;

  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  limit?: number;

  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  page?: number;
}
