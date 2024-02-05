import { Body, Controller, Get, Post, Delete, Put, Param, HttpStatus, HttpException } from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project } from './project.entity';

@Controller('projects')
export class ProjectController {
    constructor(private ProjectService: ProjectService) { }
    @Get()
    read(): Promise<Project[]> {
        return this.ProjectService.getAll();
    }

    @Get(':id')
    async getOne(@Param('id') id: number): Promise<Project> {
        try {
            return this.ProjectService.getOne(id);
        } catch (error) {
            console.error('Error fetching Project by id:', error);
            throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
        }
    }

    @Get('user/:id')
    async getAllByUser(@Param('id') user: number): Promise<Project[]> {
        try {
            return this.ProjectService.getAllByUser(user);
        } catch (error) {
            console.error('Error fetching Projects by user:', error);
            throw new HttpException('Projects not found', HttpStatus.NOT_FOUND);
        }
    }

    @Get('category/:name')
    async getAllByCategoryser(@Param('name') cat: string): Promise<Project[]> {
        try {
            return this.ProjectService.getAllByCategory(cat);
        } catch (error) {
            console.error('Error fetching Projects by category:', error);
            throw new HttpException('Projects not found', HttpStatus.NOT_FOUND);
        }
    }

    @Post('create')
    async create(@Body() Project: Project): Promise<any> {
        return this.ProjectService.create(Project);
    }

    @Put(':id/update')
    async update(@Param('id') id, @Body() Project: Project): Promise<any> {
        Project.id = Number(id);
        return this.ProjectService.update(Project);
    }

    @Delete(':id/delete')
    async delete(@Param('id') id): Promise<any> {
        return this.ProjectService.delete(id);
    }
}
