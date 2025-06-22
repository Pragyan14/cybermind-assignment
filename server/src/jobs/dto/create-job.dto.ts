import {
  IsString,
  IsEnum,
  IsInt,
  Min,
  IsDateString,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';

export enum JobType {
  FULL_TIME = 'FULL_TIME',
  PART_TIME = 'PART_TIME',
  CONTRACT = 'CONTRACT',
  INTERNSHIP = 'INTERNSHIP',
}

export class CreateJobDto {
  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  companyName: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsEnum(JobType, { message: 'jobType must be one of FULL_TIME, PART_TIME, CONTRACT, INTERNSHIP' })
  jobType: JobType;

  @IsInt()
  @Min(0)
  salaryMin: number;

  @IsInt()
  @Min(0)
  salaryMax: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  requirements: string;

  @IsString()
  @IsNotEmpty()
  responsibilities: string;

  @IsDateString()
  @IsNotEmpty() 
  applicationDeadline: string;
}
