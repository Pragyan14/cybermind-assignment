import { IsEnum, IsOptional, IsString, IsInt, Min } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { JobType } from './create-job.dto'; // reuse your enum

export class filterJobDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsEnum(JobType, {
    message: 'jobType must be one of FULL_TIME, PART_TIME, CONTRACT, INTERNSHIP',
  })
  @Transform(({ value }) => value?.toUpperCase())
  jobType?: JobType;

  @IsOptional()
  @Type(() => Number) // to transform from query string to number
  @IsInt()
  @Min(0)
  salaryMin?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  salaryMax?: number;
}
