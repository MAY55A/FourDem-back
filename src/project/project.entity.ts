import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()

export class Project {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  proposerId: number;

  @Column()
  proposerName: string;

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

  @Column()
  categories: string;

}