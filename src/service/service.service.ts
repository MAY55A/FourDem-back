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
    return await this.serviceRepository.findOne({
        where: {proposer:{id: id}},
        relations: ['proposer', 'project']
    });
}

async getAllByUser(userid: number): Promise<Service[]> {
    return this.serviceRepository.find({
        relations: ['project', 'proposer'],
        where: {proposer: {id: userid}},
        order: {proposedAt: 'DESC'}
    });
}

async getAllByProject(projectid: number): Promise<Service[]> {
    return this.serviceRepository.find({
        relations: ['project', 'proposer'],
        where: {project: {id: projectid}},
        order: {proposedAt: 'DESC'}
    });
}

async getAllByDomain(domain: string): Promise<Service[]> {
    return this.serviceRepository.find({
        relations: ['project', 'proposer'],
        where: {proposer: {domain: domain}},
        order: {proposedAt: 'DESC'}
    });
}

async getCountByDomain(domain: string): Promise<number> {
    return this.serviceRepository.count({
        where: {proposer: {domain: domain}}
    });
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

