import { IsIn, IsNotEmpty } from 'class-validator';

export class CreateVoteDto {
  @IsNotEmpty()
  @IsIn(['upvote', 'downvote'])
  voteType: 'upvote' | 'downvote';

  @IsNotEmpty()
  postId: number;
}