import { Vote } from 'src/votes/entities/vote.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ default: 0 })
  upvotes: number;

  @Column({ default: 0 })
  downvotes: number;

  @Column({ default: 0 })
  totalvotes: number;

  @ManyToOne(() => User, user => user.posts)
  author: User;

  @OneToMany(() => Vote, vote => vote.post)
  votes: Vote[];
}
