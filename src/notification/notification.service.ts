import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './notification.entity';
import { DeleteResult, IsNull, Not, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class NotificationService {
    constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
) { }

async create(notification: Notification): Promise<Notification> {
    return await this.notificationRepository.save(notification);
}

async getOne(id: number): Promise<Notification> {
    return await this.notificationRepository.findOneBy({id: id});
}

async getAllByUser(userid: number): Promise<Notification[]> {
    return this.notificationRepository.find({
        where: [{user: {id: userid}}, {type: "default"}],
        order: {seen: 'ASC', sentAt: 'DESC'},
        take: 10
    });
}

async getAllAdmin(): Promise<Notification[]> {
    return this.notificationRepository.find({
        where: {userId: IsNull(), type : Not("default")},
        order: {seen: 'ASC', sentAt: 'DESC'},
        take: 5
    });
}

async getAll(): Promise<Notification[]> {
    return await this.notificationRepository.find();
}

async update(Notification: Notification): Promise<UpdateResult> {
    return await this.notificationRepository.update(Notification.id, Notification);
}

async delete(id): Promise<DeleteResult> {
    return await this.notificationRepository.delete(id);
}
}