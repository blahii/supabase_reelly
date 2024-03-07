import { Module } from '@nestjs/common';
import { ProjectsController } from './projects/projects.controller';
import { PrismaService } from './services/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [ProjectsController],
  providers: [PrismaService],
})
export class AppModule {}