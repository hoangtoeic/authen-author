import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OneToMany, Repository } from 'typeorm';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectService {

  constructor(@InjectRepository(Project) private projectRepo: Repository<Project>)
{}
  async create(project: CreateProjectInput): Promise<Project>{
    let proj= this.projectRepo.create(project);
    return this.projectRepo.save(proj)
  }

  async findAll(): Promise<Project[]> {
    return this.projectRepo.find({
      relations:["employees"]
    })
  }

  async findOne(id: number): Promise<Project> {
    return this.projectRepo.findOne(id)
  }

  update(id: string, updateProjectInput: UpdateProjectInput) {
    return `This action updates a #${id} project`;
  }
//02363736936
  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
