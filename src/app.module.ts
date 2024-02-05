import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { Category } from './category/category.entity';
import { Project } from './project/project.entity';
import { Service } from './service/service.entity';
import { CategoryModule } from './category/category.module';
import { ProjectModule } from './project/project.module';
import { ServiceModule } from './service/service.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      database: 'fourdem',
      username: 'root',
      password: '',
      entities: [User, Category, Project, Service],
      synchronize: true,
      logging: true
    }),
    CategoryModule,
    ProjectModule,
    AuthModule,
    UsersModule,
    ServiceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
