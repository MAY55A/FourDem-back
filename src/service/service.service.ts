import { Injectable } from '@nestjs/common';
import { Service } from './service.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class ServiceService {
    constructor(
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
) { }

async create(service: Service): Promise<Service> {
    return await this.serviceRepository.save(service);
}

async getOne(id: number): Promise<Service> {
    return await this.serviceRepository.findOneBy({id: id});
}

async getAllByProject(projectid: number): Promise<Service[]> {
    return this.serviceRepository.findBy({ project: projectid });
}


async getAll(): Promise<Service[]> {
    return await this.serviceRepository.find();
}

async update(service: Service): Promise<UpdateResult> {
    return await this.serviceRepository.update(service.id, service);
}

async delete(id): Promise<DeleteResult> {
    return await this.serviceRepository.delete(id);
}
}

