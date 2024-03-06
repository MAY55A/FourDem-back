import { Project } from 'src/project/project.entity';
import { User } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany, ManyToOne } from 'typeorm';

@Entity()

export class Service {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.services, {eager: true})
  proposer: User;

  @ManyToOne(() => Project, (project) => project.services, {eager: true})
  project: Project;

  @Column({default: "proposé"})
  status: string;

  @Column({nullable: true})
  liked: boolean;

  @CreateDateColumn()
  proposedAt: Date;

  @Column({type: "text", default: "description ..."})
  description: string;

  @Column()
  skills: string;

}