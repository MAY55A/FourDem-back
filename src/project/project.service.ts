import { Injectable } from '@nestjs/common';
import { Project } from './project.entity';
import { DeleteResult, ILike, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(Project)
        private projectRepository: Repository<Project>,
    ) { }

    async create(project: Project): Promise<Project> {
        return await this.projectRepository.save(project);
    }

    async getAllByUser(userid: number): Promise<Project[]> {
        return this.projectRepository.findBy({ proposer: userid });
    }

    async getAllByCategory(catid: number): Promise<Project[]> {
        return this.projectRepository.findBy({ categories: ILike(`%*${catid}*%`) });
    }

    async getAll(): Promise<Project[]> {
        return await this.projectRepository.find();
    }

    async update(project: Project): Promise<UpdateResult> {
        return await this.projectRepository.update(project.id, project);
    }

    async delete(id): Promise<DeleteResult> {
        return await this.projectRepository.delete(id);
    }
}
