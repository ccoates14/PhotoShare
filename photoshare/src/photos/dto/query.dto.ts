
import { Type } from "class-transformer/decorators";
import { IsOptional, IsPositive } from "class-validator";

export class QueryDto{
  @Type(() => Number)
  @IsOptional()
  @IsPositive()
  limit: number;

  @Type(() => Number)
  @IsOptional()
  @IsPositive()
  offset: number;

  query: string;
}