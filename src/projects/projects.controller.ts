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
    @Query('year') year: string = '',
    @Query('quarter') quarter: string = '',
    @Query('month') month: string = '',
    @Query('twoBedroom') twoBedroom: string,
    @Query('sixBedroom') sixBedroom: string,
    @Query('oneBedroomPool') oneBedroomPool: string,
    @Query('oneBedroom') oneBedroom: string,
    @Query('fourBedroom') fourBedroom: string,
    @Query('threeBedroom') threeBedroom: string,
    @Query('mergedStudios') mergedStudios: string,
    @Query('twoBedroomPool') twoBedroomPool: string,
    @Query('eightBedroom') eightBedroom: string,
    @Query('nineBedroom') nineBedroom: string,
    @Query('sevenBedroom') sevenBedroom: string,
    @Query('studioPool') studioPool: string,
    @Query('fiveBedroom') fiveBedroom: string,
    @Query('threeBedroomPool') threeBedroomPool: string,
    @Query('twoAndHalfBedroom') twoAndHalfBedroom: string,
    @Query('studio') studio: string,
    @Query('oneAndHalfBedroom') oneAndHalfBedroom: string,
    @Query('threeAndHalfBedroom') threeAndHalfBedroom: string,

  ) {
    const skip = page ? (parseInt(page) - 1) * parseInt(perPage || '24') : 0;
    const take = perPage ? parseInt(perPage) : 24;
    const developerName = developer ? developer.split(',') : [];
    const priorityValues = priority ? priority.split(',') : [];
    const statusValues = status ? status.split(',') : [];
    const regionsValues = regions ? regions.split(',') : [];
    const areaValues = units_types ? units_types.split(',') : [];
    const whereClause = {
      Year: year || undefined,  // Задаємо undefined, якщо параметр пустий
      Quarter: quarter || undefined,
      Month: month || undefined,
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
      ...(twoBedroom === 'true' && { TwoBedroom: { not: 'false' } }),
      ...(sixBedroom === 'true' && { SixBedroom: { not: 'false' } }),
      ...(oneBedroomPool === 'true' && { OneBedroomPool: { not: '' } }),
      ...(oneBedroom === 'true' && { OneBedroom: { not: 'false' } }),
      ...(fourBedroom === 'true' && { FourBedroom: { not: 'false' } }),
      ...(threeBedroom === 'true' && { ThreeBedroom: { not: 'false' } }),
      ...(mergedStudios === 'true' && { MergedStudios: { not: 'false' } }),
      ...(twoBedroomPool === 'true' && { TwoBedroomPool: { not: 'false' } }),
      ...(eightBedroom === 'true' && { EightBedroom: { not: 'false' } }),
      ...(nineBedroom === 'true' && { NineBedroom: { not: 'false' } }),
      ...(sevenBedroom === 'true' && { SevenBedroom: { not: 'false' } }),
      ...(studioPool === 'true' && { StudioPool: { not: 'false' } }),
      ...(fiveBedroom === 'true' && { FiveBedroom: { not: 'false' } }),
      ...(threeBedroomPool === 'true' && { ThreeBedroomPool: { not: 'false' } }),
      ...(twoAndHalfBedroom === 'true' && { TwoAndHalfBedroom: { not: 'false' } }),
      ...(studio === 'true' && { Studio: { not: 'false' } }),
      ...(oneAndHalfBedroom === 'true' && { OneAndHalfBedroom: { not: 'false' } }),
      ...(threeAndHalfBedroom === 'true' && { ThreeAndHalfBedroom: { not: 'false' } }),

    };

    if (year) whereClause.Year = year;
    if (quarter) whereClause.Quarter = quarter;
    if (month) whereClause.Month = month;

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