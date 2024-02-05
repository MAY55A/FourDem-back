import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

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

}