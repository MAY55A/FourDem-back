import { Project } from 'src/project/project.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany} from 'typeorm';

@Entity()

export class Category {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  name: string;

  @Column({nullable: true})
  description: string;

  @Column()
  domain: string;

  @CreateDateColumn()
  addedAt: Date;

  @ManyToMany(() => Project, project => project.categories)
  projects: Project[];
}