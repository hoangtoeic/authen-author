import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectResolver } from './project.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from 'src/employee/entities/employee.entity';
import { Project } from './entities/project.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[AuthModule,
    TypeOrmModule.forFeature([Project])],
  providers: [ProjectResolver, ProjectService]
})
export class ProjectModule {}
