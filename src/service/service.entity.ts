import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()

export class Service {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  proposerId: number;

  @Column()
  proposerName: string;

  @Column()
  project: number;

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