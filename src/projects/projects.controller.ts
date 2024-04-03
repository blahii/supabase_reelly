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
    @Query('display_all') dispall: string = '',
    @Query('status') status: string = '',
    @Query('developer') developer: string = '',
    @Query('priority') priority: string = '',
    @Query('furnishing') furnishing: string = '',
    @Query('min') minrangePrice: string = '',
    @Query('max') maxrangePrice: string = '',
    @Query('year') year: string = '',
    @Query('quarter') quarter: string = '',
    @Query('month') month: string = '',
    @Query('twoBedroom') twoBedroom: string = '',
    @Query('sixBedroom') sixBedroom: string = '',
    @Query('oneBedroomPool') oneBedroomPool: string = '',
    @Query('oneBedroom') oneBedroom: string = '',
    @Query('fourBedroom') fourBedroom: string = '',
    @Query('threeBedroom') threeBedroom: string = '',
    @Query('mergedStudios') mergedStudios: string = '',
    @Query('twoBedroomPool') twoBedroomPool: string = '',
    @Query('eightBedroom') eightBedroom: string = '',
    @Query('nineBedroom') nineBedroom: string = '',
    @Query('sevenBedroom') sevenBedroom: string = '',
    @Query('studioPool') studioPool: string = '',
    @Query('fiveBedroom') fiveBedroom: string = '',
    @Query('threeBedroomPool') threeBedroomPool: string = '',
    @Query('twoAndHalfBedroom') twoAndHalfBedroom: string = '',
    @Query('studio') studio: string = '',
    @Query('oneAndHalfBedroom') oneAndHalfBedroom: string = '',
    @Query('threeAndHalfBedroom') threeAndHalfBedroom: string = '',

  ) {
    const skip = page ? (parseInt(page) - 1) * parseInt(perPage || '24') : 0;
    const take = perPage ? parseInt(perPage) : 24;
    const developerName = developer ? developer.split(',') : [];
    const priorityValues = priority ? priority.split(',') : [];
    const statusValues = status ? status.split(',') : [];
    const regionsValues = regions ? regions.split(',') : [];
    const areaValues = units_types ? units_types.split(',') : [];
    const whereClause = {
      Year: { contains: year },  // Задаємо undefined, якщо параметр пустий
      Quarter: { contains: quarter },
      Month: { contains: month },
      Display_all: { contains: dispall },
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
      TwoBedroom: { contains: twoBedroom },
      SixBedroom: { contains: sixBedroom },
      OneBedroomPool: { contains: oneBedroomPool },
      OneBedroom: { contains: oneBedroom },
      FourBedroom: { contains: fourBedroom },
      ThreeBedroom: { contains: threeBedroom },
      MergedStudios: { contains: mergedStudios },
      TwoBedroomPool: { contains: twoBedroomPool },
      EightBedroom: { contains: eightBedroom },
      NineBedroom: { contains: nineBedroom },
      SevenBedroom: { contains: sevenBedroom },
      StudioPool: { contains: studioPool },
      FiveBedroom: { contains: fiveBedroom },
      ThreeBedroomPool: { contains: threeBedroomPool },
      TwoAndHalfBedroom: { contains: twoAndHalfBedroom },
      Studio: { contains: studio },
      OneAndHalfBedroom: { contains: oneAndHalfBedroom },
      ThreeAndHalfBedroom: { contains: threeAndHalfBedroom },

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