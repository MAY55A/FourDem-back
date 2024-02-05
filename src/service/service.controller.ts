import { Body, Controller, Get, Post, Delete, Put, Param, HttpStatus, HttpException } from '@nestjs/common';
import { Service } from './service.entity';
import { ServiceService } from './service.service';

@Controller('services')
export class ServiceController {
    constructor(private serviceService: ServiceService) { }
    @Get()
    read(): Promise<Service[]> {
        return this.serviceService.getAll();
    }

    @Get(':id')
    async getOne(@Param('id') id: number): Promise<Service> {
        try {
            return this.serviceService.getOne(id);
        } catch (error) {
            console.error('Error fetching Service by id:', error);
            throw new HttpException('Service not found', HttpStatus.NOT_FOUND);
        }
    }

    @Get('project/:id')
    async getAllByProject(@Param('id') project: number): Promise<Service[]> {
        try {
            return this.serviceService.getAllByProject(project);
        } catch (error) {
            console.error('Error fetching Services by Project:', error);
            throw new HttpException('Services not found', HttpStatus.NOT_FOUND);
        }
    }

    @Post('create')
    async create(@Body() service: Service): Promise<any> {
        return this.serviceService.create(service);
    }

    @Put(':id/update')
    async update(@Param('id') id, @Body() service: Service): Promise<any> {
        service.id = Number(id);
        return this.serviceService.update(service);
    }

    @Delete(':id/delete')
    async delete(@Param('id') id): Promise<any> {
        return this.serviceService.delete(id);
    }
}
