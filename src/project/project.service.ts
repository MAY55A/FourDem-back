import { Injectable, NotFoundException } from '@nestjs/common';
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
        return this.projectRepository.findOne({
            where: {id: id},
            relations: ['proposer', 'categories']
        });
    }

    async getAllByUser(userid: number): Promise<Project[]> {
        return this.projectRepository.find({
            where: { proposer: {id: userid} },
            relations: ['proposer', 'categories'],
            order: {proposedAt: 'DESC'}
        });
    }

    async getAllByCategory(catid: number): Promise<Project[]> {
        return this.projectRepository.find({
            where: { categories: {id: catid} },
            relations: ['proposer', 'categories'],
            order: {publishedAt: 'DESC'}
        });
    }

    async getAllPublished(): Promise<Project[]> {
        return this.projectRepository.find({
            where: { status : 'publié' },
            relations: ['proposer', 'categories'],
            order: {publishedAt: 'DESC'}
        });
    }

    async getAll(): Promise<Project[]> {
        return await this.projectRepository.find({relations: ['proposer', 'categories']});
    }

    async update(project: Project): Promise<Project> {
        const existingProject = await this.projectRepository.findOne({
            relations: ['categories'],
            where: {id: project.id}
        });
        if (!existingProject) {
          throw new NotFoundException(`Project with ID ${project.id} not found.`);
        }
        Object.assign(existingProject, project);
        return await this.projectRepository.save(existingProject);
    }

    async delete(id): Promise<DeleteResult> {
        return await this.projectRepository.delete(id);
    }
}
