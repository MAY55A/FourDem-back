import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { Notification } from './notification.entity';
import { NotificationService } from './notification.service';

@Controller('notifications')
export class NotificationController {
    constructor(private notificationService: NotificationService) { }
    @Get()
    read(): Promise<Notification[]> {
        try {
            return this.notificationService.getAll();
        } catch (error) {
            console.error('Error fetching notifications:', error);
            throw new HttpException('Notifications not found', HttpStatus.NOT_FOUND);
        }
    }

    @Get('user/:id')
    async getAllByUser(@Param('id') user: number): Promise<Notification[]> {
        try {
            return this.notificationService.getAllByUser(user);
        } catch (error) {
            console.error('Error fetching Notifications by user:', error);
            throw new HttpException('Notifications not found', HttpStatus.NOT_FOUND);
        }
    }

    @Get('admin')
    async getAllAdmin(): Promise<Notification[]> {
        try {
            return this.notificationService.getAllAdmin();
        } catch (error) {
            console.error("Error fetching Admin's notifications :", error);
            throw new HttpException('Notifications not found', HttpStatus.NOT_FOUND);
        }
    }

    @Post('create')
    async create(@Body() Notification: Notification): Promise<any> {
        try {
            return this.notificationService.create(Notification);
        } catch (error) {
            console.error('Error creating notification', error);
            throw new HttpException('Notification not created', HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @Put(':id/update')
    async update(@Param('id') id, @Body() Notification: Notification): Promise<any> {
        try {
            Notification.id = Number(id);
            return this.notificationService.update(Notification);
        } catch (error) {
            console.error('Error updating notification', error);
            throw new HttpException('Notification not updated', HttpStatus.NOT_MODIFIED);
        }
    }

    @Delete(':id/delete')
    async delete(@Param('id') id): Promise<any> {
        try {
            return this.notificationService.delete(id);
        } catch (error) {
            console.error('Error deleting notification:', error);
            throw new HttpException('Notification not found', HttpStatus.NOT_FOUND);
        }
    }
}