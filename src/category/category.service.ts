import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

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
        return this.CategoryRepository.findBy({ domain: domain });
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
