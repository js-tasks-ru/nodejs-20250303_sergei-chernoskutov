import { IsString, IsInt, Min, IsOptional, IsEnum } from "class-validator";
import { Type } from "class-transformer";
import { TaskStatus } from "./task.model";

export class GetTasksQueryParamsModel {
  @IsString()
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  sortBy?: string;

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
