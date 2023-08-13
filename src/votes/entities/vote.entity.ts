import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Post } from '../../posts/entities/post.entity';

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
