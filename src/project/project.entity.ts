import { Category } from 'src/category/category.entity';
import { Service } from 'src/service/service.entity';
import { User } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';

@Entity()

export class Project {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => User, (user) => user.projects, {eager: true})
  proposer: User;

  @Column({default: "proposé"})
  status: string;

  @CreateDateColumn()
  proposedAt: Date;

  @Column()
  publishedAt: Date;

  @Column()
  finishedAt: Date;

  @Column({type: "text", default: "description ..."})
  description: string;

  @ManyToMany(() => Category, category => category.projects, {eager: true, cascade: true })
  @JoinTable()
  categories: Category[];

  @OneToMany(() => Service, (service) => service.project)
  services: Service[];
}