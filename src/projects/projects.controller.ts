import { Controller, Get, Query } from '@nestjs/common';
import { PrismaService } from '../services/prisma/prisma.service';

@Controller('projects')
export class ProjectsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async getProjects(
    @Query('page') page: string,
    @Query('perPage') perPage: string,
    @Query('search') search: string = '', //work
    @Query('regions') regions: string = '', //work
    @Query('status') status: string = '', //work
    @Query('priority') priority: string = '', //-!
    @Query('furnishing') furnishing: string = '', //work
    @Query('min') minrangePrice: string = '', //work
    @Query('max') maxrangePrice: string = '', //work
  ) {
    const skip = page ? (parseInt(page) - 1) * parseInt(perPage || '24') : 0;
    const take = perPage ? parseInt(perPage) : 24;

    const priorityValues = priority ? priority.split(',') : []; //

    const projects = await this.prisma.projects.findMany({
      where: {
        Project_name: { contains: search },
        Region: { contains: regions },
        Status: { contains: status },
        Priority: priorityValues.length ? { in: priorityValues } : undefined,
        Furnishing: { contains: furnishing },
        Price_from_AED: { contains: minrangePrice },
        Price_to_AED: { contains: maxrangePrice },
      },
      skip,
      take,
    });

    return projects;
  }
}
