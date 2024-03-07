import { Controller, Get, Query } from '@nestjs/common';
import { PrismaService } from '../services/prisma/prisma.service';

@Controller('projects')
export class ProjectsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async getProjects(
    @Query('page') page: number = 1,//work
    @Query('perPage') perPage: number = 24, //work
    @Query('search') search: string = '',//work
    @Query('regions') regions: string = '', //work
    @Query('status') status: string = '', //work
    @Query('priority') priority: string = '', //-!
    @Query('bedrooms') bedrooms: string = '',  //work
    // @Query('priceRange') priceRange: string = '', 
    @Query('furnishing') furnishing: string = '',  //work
    // @Query('coordinates') coordinates: string = '',
  ) {
    const skip = (page - 1) * perPage; 
    const take = perPage; 

    // let [minPrice, maxPrice] = priceRange.split(',').map(Number);
    const bedroomList = bedrooms.split(',').map(Number);
    const priorityValues = priority ? priority.split(',') : []; // Перетворюємо рядок на масив, якщо параметр заданий

    const bedroomsValues = bedrooms ? bedrooms.split(',') : []; // Перетворюємо рядок на масив, якщо параметр заданий


    // const [latitude, longitude] = coordinates.split(',').map(parseFloat);


    // const coordinatesFilter = JSON.stringify({ latitude, longitude });

    const projects = await this.prisma.projects.findMany({
      where: {
        Project_name: { contains: search },
        Region: { contains: regions }, 
        Status: { contains: status },
        Priority: priorityValues.length ? { in: priorityValues } : undefined, 
        Unit_bedrooms: bedroomsValues.length ? { in: bedroomsValues } : undefined,
        // Price_from_AED: { gte: minPrice },
        // Price_to_AED: { lte: maxPrice },
        Furnishing: { contains: furnishing }
        // Coordinates: coordinatesFilter,
      },
      skip, 
      take, 
    });

    return projects;
  }
}


