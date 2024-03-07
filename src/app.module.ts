import { Module } from '@nestjs/common';
import { ProjectsController } from './projects/projects.controller';
import { PrismaService } from './services/prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [ProjectsController],
  providers: [PrismaService],
})
export class AppModule {}
