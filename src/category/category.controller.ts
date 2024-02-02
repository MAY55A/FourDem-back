import { Body, Controller, Get, Post, Delete, Put, Param, HttpStatus, HttpException } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.entity';

@Controller('categories')
export class CategoryController {
    constructor(private CategoryService: CategoryService) { }
    @Get()
    read(): Promise<Category[]> {
        return this.CategoryService.getAll();
    }

    @Get(':domain')
    async getAllByDomain(@Param('domain') domain: string): Promise<Category[]> {
        try {
            return this.CategoryService.getAllByDomain(domain);
        } catch (error) {
            console.error('Error fetching Category by domain:', error);
            throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
        }
    }

    @Post('create')
    async create(@Body() Category: Category): Promise<any> {
        return this.CategoryService.create(Category);
    }

    @Put(':id/update')
    async update(@Param('id') id, @Body() Category: Category): Promise<any> {
        Category.id = Number(id);
        return this.CategoryService.update(Category);
    }

    @Delete(':id/delete')
    async delete(@Param('id') id): Promise<any> {
        return this.CategoryService.delete(id);
    }
}
