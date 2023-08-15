import { Module } from '@nestjs/common';
import { VotesService } from './votes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VotesController } from './votes.controller';
import { Vote } from './entities/vote.entity';
import { Post } from 'src/posts/entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Vote])],
  controllers: [VotesController],
  providers: [VotesService],
})
export class VotesModule {}
