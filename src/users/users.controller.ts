import { Body, Controller, Get, Post, Delete, Put, Param, HttpStatus, HttpException, ParseIntPipe } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UsersController {
    constructor(private userService: UserService) { }
    @Get()
    read(): Promise<User[]> {
        return this.userService.readAll();
    }

    @Get('type::type')
    async findByType(@Param('type') type: string): Promise<User[]> {
        try {
            return this.userService.findByType(type);
        } catch (error) {
            console.error('Error fetching users by type:', error);
            throw new HttpException('Users not found', HttpStatus.NOT_FOUND);
        }
    }

    @Get('email::email')
    async findByEmail(@Param('email') email: string): Promise<User> {
        try {
            return this.userService.findByEmail(email);
        } catch (error) {
            console.error('Error fetching user by email:', error);
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
    }

    @Get('id::id')
    findById(@Param('id') id: number): Promise<User> {
        try {
            return this.userService.findById(id);
        } catch (error) {
            console.error('Error fetching user by ID:', error);
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
    }

    @Get('hash/:email')
    getHash(@Param('email') email: string): Promise<User> {
        try {
            return this.userService.getHash(email);
        } catch (error) {
            console.error('Error fetching user by email:', error);
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
    }

    @Post('create')
    async create(@Body() user: User): Promise<any> {
        return this.userService.create(user);
    }

    @Put(':id/update')
    async update(@Param('id') id, @Body() user: User): Promise<any> {
        user.id = Number(id);
        return this.userService.update(user);
    }

    @Delete(':id/delete')
    async delete(@Param('id') id): Promise<any> {
        return this.userService.delete(id);
    }
}
