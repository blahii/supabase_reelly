import { Controller, Get, Query } from '@nestjs/common';
import { PrismaService } from '../services/prisma/prisma.service';

@Controller('projects')
export class ProjectsController {
  constructor(private prisma: PrismaService) {}
  @Get()
  async getProjects(
    @Query('page') page: string,
    @Query('perPage') perPage: string,
    @Query('search') search: string = '',
    @Query('regions') regions: string = '',
    @Query('units_types') units_types: string = '',
    @Query('area_name') name: string = '',
    @Query('status') status: string = '',
    @Query('developer') developer: string = '',
    @Query('priority') priority: string = '',
    @Query('furnishing') furnishing: string = '',
    @Query('min') minrangePrice: string = '',
    @Query('max') maxrangePrice: string = '',
  ) {
    const skip = page ? (parseInt(page) - 1) * parseInt(perPage || '24') : 0;
    const take = perPage ? parseInt(perPage) : 24;
    const developerName = developer ? developer.split(',') : [];
    const priorityValues = priority ? priority.split(',') : [];
    const statusValues = status ? status.split(',') : [];
    const regionsValues = regions ? regions.split(',') : [];
    const areaValues = units_types ? units_types.split(',') : [];
    const whereClause = {
      Project_name: { contains: search },
      Developers_name: developerName.length ? { in: developerName } : undefined,
      Region: regionsValues.length ? { in: regionsValues } : undefined,
      Units_types: areaValues.length ? { in: areaValues } : undefined,
      Area_name: { contains: name },
      Status: statusValues.length ? { in: statusValues } : undefined,
      Priority: priorityValues.length ? { in: priorityValues } : undefined,
      Furnishing: { contains: furnishing },
      Price_from_AED: { contains: minrangePrice },
      Price_to_AED: { contains: maxrangePrice },
    };
    const projects = await this.prisma.projects.findMany({
      where: whereClause,
      skip,
      take,
    });

    // Get total count of projects matching the search criteria
    const totalCount = await this.prisma.projects.count({
      where: whereClause,
    });

    return { projects, totalCount };
  }
}