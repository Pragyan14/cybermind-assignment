import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';
import { filterJobDto } from './dto/filter-job.dto';

@Injectable()
export class JobsService {

  constructor(private readonly databaseService: DatabaseService) { }

  async create(createJobDto: CreateJobDto) {
    return this.databaseService.job.create({
      data: createJobDto,
    });
  }

  async findAll(filters: filterJobDto) {

    const { title, location, jobType, salaryMin, salaryMax } = filters;

    const jobs = await this.databaseService.job.findMany({
      where: {
        ...(title && { title: { contains: title, mode: 'insensitive' } }),
        ...(location && { location: { contains: location, mode: 'insensitive' } }),
        ...(jobType && { jobType }),
        ...(salaryMin !== undefined || salaryMax !== undefined
          ? {
            AND: [
              ...(salaryMin !== undefined ? [{ salaryMin: { gte: salaryMin } }] : []),
              ...(salaryMax !== undefined ? [{ salaryMax: { lte: salaryMax } }] : []),
            ],
          }
          : {}),
      },
    });

    if(!jobs || jobs.length === 0){
      throw new NotFoundException("No job found")
    }

    return jobs;
  }

  async findOne(id: number) {
    const job = await this.databaseService.job.findUnique({
      where: {
        id,
      }
    });
    if (!job) throw new NotFoundException("No job found");
    return job;
  }

  async update(id: number, updateJobDto: UpdateJobDto) {
    return this.databaseService.job.update({
      where: {
        id,
      },
      data: updateJobDto
    })
  }

  async remove(id: number) {
    try {
      await this.databaseService.job.delete({
        where: { id },
      });

      return  {message: `Job with ID ${id} deleted successfully`};

    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('Job not found');
      }
      throw error;
    }
  }
}
