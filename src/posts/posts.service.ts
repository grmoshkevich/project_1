import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PostsService {
  constructor(@InjectRepository(Post) private readonly postRepository: Repository<Post>) {}

  async create(createPostDto: CreatePostDto, user: User): Promise<Post> {
    const newPost = this.postRepository.create({...createPostDto, author: user});
    return await this.postRepository.save(newPost);
  }

  // create(createPostDto: CreatePostDto) {
  //   return 'This action adds a new post';
  // }

  findAllPublic(): Promise<Post[]> {
    return this.postRepository.find();
  }

  async findAllForUser(user: User): Promise<Post[]> {
    const posts = await this.postRepository
      .createQueryBuilder('post')
      .leftJoin('post.votes', 'vote', 'vote.userId = :userId', { userId: user.id })
      .addSelect('vote.voteType')
      .orderBy('post.totalvotes', "DESC")
      .getMany();


    return posts;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} post`;
  // }

  findOne(id: number): Promise<Post | null> {
    return this.postRepository.findOneBy({ id });
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}

// import { Injectable } from '@nestjs/common';
// import { CreatePostDto } from './dto/create-post.dto';
// import { UpdatePostDto } from './dto/update-post.dto';

// @Injectable()
// export class PostsService {
//   create(createPostDto: CreatePostDto) {
//     return 'This action adds a new post';
//   }

//   findAll() {
//     return `This action returns all posts`;
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} post`;
//   }

//   update(id: number, updatePostDto: UpdatePostDto) {
//     return `This action updates a #${id} post`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} post`;
//   }
// }
