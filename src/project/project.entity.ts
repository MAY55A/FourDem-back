import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()

export class Project {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  proposer: number;

  @Column({default: "proposed"})
  status: string;

  @CreateDateColumn()
  proposedAt: Date;

  @Column()
  publishedAt: Date;

  @Column()
  finishedAt: Date;

  @Column({default: "description ..."})
  description: string;

  @Column()
  categories: string;

}