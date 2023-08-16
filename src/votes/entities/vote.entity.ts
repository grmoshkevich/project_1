import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Post } from '../../posts/entities/post.entity';

@Entity()
export class Vote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  voteType: 'upvote' | 'downvote';

  @Column({ nullable: true })
  userId: number

  @ManyToOne(() => User)
  user: User;

  @Column({ nullable: true })
  postId: number

  @ManyToOne(() => Post)
  post: Post;
}
