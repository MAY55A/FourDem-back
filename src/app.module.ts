import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { Category } from './category/category.entity';
import { Project } from './project/project.entity';
import { Service } from './service/service.entity';
import { Notification } from './notification/notification.entity';
import { CategoryModule } from './category/category.module';
import { ProjectModule } from './project/project.module';
import { ServiceModule } from './service/service.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      url: process.env.DB_URL,
      entities: [User, Category, Project, Service, Notification],
    }),
    CategoryModule,
    ProjectModule,
    AuthModule,
    UsersModule,
    ServiceModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
