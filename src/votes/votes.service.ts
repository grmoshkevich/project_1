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

  async create(createVoteDto: CreateVoteDto, user: User): Promise<string | null> {
    console.log('%c⧭', 'color: #d90000', CreateVoteDto, user);
    const {voteType, postId} = createVoteDto;
    const post = await this.postRepository.findOneBy({ id: postId });
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const existingVote = await this.voteRepository.findOne({
      where: { user, post },
    });
    if (!existingVote) {
      console.log('%c⧭', 'color: #997326', 'non existing');
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

      await this.postRepository.save(post);
      await this.voteRepository.save(newVote);
      console.log('%c⧭', 'color: #ffcc00', 'ytoooo', voteType);
      return voteType;
      console.log('%c⧭', 'color: #99adcc', 'bsa');
    } else {
      // Update the existing vote
      if (existingVote.voteType !== voteType) {
        console.log('%c⧭', 'color: #997326', 'different type');
        existingVote.voteType = voteType
        if (voteType === 'upvote') {
          post.upvotes++;
          post.downvotes--;
        } else if (voteType === 'downvote') {
          post.downvotes++;
          post.upvotes--;
        }
        await this.postRepository.save(post);
        await this.voteRepository.save(existingVote);
        return voteType
      } else {
        console.log('%c⧭', 'color: #997326', 'same type');
        await this.voteRepository.remove(existingVote);
        if (voteType === 'upvote') {
          post.upvotes--;
        } else if (voteType === 'downvote') {
          post.downvotes--;
        }
        console.log('%c⧭', 'color: #bfffc8', 11);
        await this.postRepository.save(post);
        console.log('%c⧭', 'color: #1d3f73', 2);
        return null;
      }
    }
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
