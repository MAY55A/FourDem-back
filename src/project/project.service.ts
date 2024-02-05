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

    async getOne(id: number): Promise<Project> {
        return await this.projectRepository.findOneBy({id: id});
    }

    async getAllByUser(userid: number): Promise<Project[]> {
        return this.projectRepository.findBy({ proposer: userid });
    }

    async getAllByCategory(cat: string): Promise<Project[]> {
        return this.projectRepository.findBy({ categories: ILike(`%${cat}%`) });
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
