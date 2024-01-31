import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    async create(user: User): Promise<User> {
        return await this.userRepository.save(user);
    }

    async findByEmail(useremail: string): Promise<User | undefined> {
        return this.userRepository.findOneBy({ email: useremail }); 
    }

    async findById(userid: number): Promise<User | undefined> {
        return this.userRepository.findOneBy({ id: userid }); 
    }
    
    async readAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async update(user: User): Promise<UpdateResult> {

        return await this.userRepository.update(user.id, user);
    }

    async delete(id): Promise<DeleteResult> {
        return await this.userRepository.delete(id);
    }
}
