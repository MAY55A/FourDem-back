import { Project } from 'src/project/project.entity';
import { Service } from 'src/service/service.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { Notification } from '../notification/notification.entity';

@Entity()

export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({select: false})
  hash: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({nullable: true})
  description: string;

  @Column()
  type: string;

  @Column({ nullable: true })
  domain: string;

  @Column({ nullable: true })
  contacts: String;

  @Column({ nullable: true })
  tel: String;

  @Column({ nullable: true })
  skills: string;

  @OneToMany(() => Service, (service) => service.proposer)
  services: Service[];

  @OneToMany(() => Project, (project) => project.proposer)
  projects: Project[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];
}