import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Project } from 'src/project/project.entity';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private CategoryRepository: Repository<Category>,
    ) { }

    async create(Category: Category): Promise<Category> {
        return await this.CategoryRepository.save(Category);
    }

    async getAllByDomain(domain: string): Promise<Category[]> {
        return this.CategoryRepository.find({
            where: { domain: domain},
            relations: ['projects']
        });
    }

    async getOneWithProjects(id: number): Promise<Category> {
        return this.CategoryRepository.findOne({
            where: { id: id},
            relations: ['projects']
        });
    }

    async getOne(id: number): Promise<Category> {
        return this.CategoryRepository.findOneBy({ id: id });
    }

    async getAll(): Promise<Category[]> {
        return await this.CategoryRepository.find();
    }

    async update(Category: Category): Promise<UpdateResult> {
        return await this.CategoryRepository.update(Category.id, Category);
    }

    async delete(id): Promise<DeleteResult> {
        return await this.CategoryRepository.delete(id);
    }
}
