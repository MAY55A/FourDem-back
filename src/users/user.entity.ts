import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()

export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  hash: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({default: "description ..."})
  description: string;

  @Column()
  type: string;

  @Column({ nullable: true })
  domain: string;

  @Column({ type: 'simple-array', nullable: true })
  contacts: string[];

  @Column({ type: 'simple-array', nullable: true })
  skills: string[];
}