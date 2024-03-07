import { Controller, Get, Query } from '@nestjs/common';
import { PrismaService } from '../services/prisma/prisma.service';

@Controller('projects')
export class ProjectsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async getProjects(
    @Query('page') page: string, 
  @Query('perPage') perPage: string,
    @Query('search') search: string = '',//work
    @Query('regions') regions: string = '', //work
    @Query('status') status: string = '', //work
    @Query('priority') priority: string = '', //-!
    @Query('bedrooms') bedrooms: string = '',  //work
    // @Query('priceRange') priceRange: string = '', 
    @Query('furnishing') furnishing: string = '',  //work
    // @Query('coordinates') coordinates: string = '',
  ) {
    const skip = page ? (parseInt(page) - 1) * parseInt(perPage || '24') : 0; 
    const take = perPage ? parseInt(perPage) : 24; 

    const priorityValues = priority ? priority.split(',') : []; // 
    // const [minPrice, maxPrice] = priceRange ? priceRange.split(',').map(Number) : [undefined, undefined];
    const bedroomsValues = bedrooms ? bedrooms.split(',') : []; 


    // const [latitude, longitude] = coordinates.split(',').map(parseFloat);


    // const coordinatesFilter = JSON.stringify({ latitude, longitude });

    const projects = await this.prisma.projects.findMany({
      where: {
        Project_name: { contains: search },
        Region: { contains: regions }, 
        Status: { contains: status },
        Priority: priorityValues.length ? { in: priorityValues } : undefined, 
        Unit_bedrooms: bedroomsValues.length ? { in: bedroomsValues } : undefined,
        // AND: [
        //   { Price_from_AED: { gte: minPrice.toString() } },
        //   { Price_to_AED: { lte: maxPrice.toString() } },
        // ],
        Furnishing: { contains: furnishing }
        // Coordinates: coordinatesFilter,
      },
      skip, 
      take, 
    });

    return projects;
  }
}


