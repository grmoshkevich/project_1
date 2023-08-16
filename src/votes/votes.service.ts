import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Vote } from './entities/vote.entity';
import { Post } from '../posts/entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VotesService {
  constructor(
    @InjectRepository(Vote) private readonly voteRepository: Repository<Vote>,
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
  ) {}
  // create(createVoteDto: CreateVoteDto) {
  //   return 'This action adds a new vote';
  // }

  async create(createVoteDto: CreateVoteDto, user: User): Promise<Vote | null> {
    const {voteType, postId} = createVoteDto;
    const post = await this.postRepository.findOneBy({ id: postId });
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const existingVote = await this.voteRepository.findOne({
      where: { user, post },
      select: ['id', 'voteType', 'postId', 'userId']
    });
    console.log('%c⧭', 'color: #994d75', existingVote);
    if (!existingVote) {
      // Create a new vote
      const newVote = new Vote();
      newVote.user = user;
      newVote.post = post;
      newVote.voteType = voteType;

      // Update post's upvotes and downvotes based on vote type
      if (voteType === 'upvote') {
        post.upvotes++;
      } else if (voteType === 'downvote') {
        post.downvotes++;
      }

      post.totalvotes = post.upvotes - post.downvotes;
      await this.postRepository.save(post);
      await this.voteRepository.save(newVote);
      delete newVote.post;
      delete newVote.user;
      return newVote;
    } else {
      // Update the existing vote
      if (existingVote.voteType !== voteType) {
        existingVote.voteType = voteType
        if (voteType === 'upvote') {
          post.upvotes++;
          post.downvotes--;
        } else if (voteType === 'downvote') {
          post.downvotes++;
          post.upvotes--;
        }
        post.totalvotes = post.upvotes - post.downvotes;
        await this.postRepository.save(post);
        await this.voteRepository.save(existingVote);
        console.log('%c⧭', 'color: #7f2200', existingVote);
        return existingVote
      } else {
        await this.voteRepository.remove(existingVote);
        if (voteType === 'upvote') {
          post.upvotes--;
        } else if (voteType === 'downvote') {
          post.downvotes--;
        }
        post.totalvotes = post.upvotes - post.downvotes;
        await this.postRepository.save(post);
        return null;
      }
    }
  }

  async getVotes(userId: number): Promise<Vote[]> {
    return this.voteRepository.findBy({ userId })
  }

  findAll() {
    return `This action returns all votes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vote`;
  }

  update(id: number, updateVoteDto: UpdateVoteDto) {
    return `This action updates a #${id} vote`;
  }

  remove(id: number) {
    return `This action removes a #${id} vote`;
  }
}
