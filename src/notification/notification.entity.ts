import { User } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn} from 'typeorm';

@Entity()

export class Notification {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: 'default'})
  type: string;

  @Column({type: "text"})
  content: string;

  @Column({default: 0})
  seen: boolean;

  @CreateDateColumn()
  sentAt: Date;

  @ManyToOne(() => User, user => user.notifications)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ nullable: true })
  userId: number;
}