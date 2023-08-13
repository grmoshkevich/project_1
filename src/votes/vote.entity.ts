import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Post } from '../posts/post.entity';

@Entity()
export class Vote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  voteType: 'upvote' | 'downvote';

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Post)
  post: Post;
}
