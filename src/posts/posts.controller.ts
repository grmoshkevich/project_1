import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/user.decorator';
import { User as UserEntity } from 'src/users/entities/user.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createPostDto: CreatePostDto, @User() user: UserEntity) {
    return this.postsService.create(createPostDto, user);
  }

  @Get('public')
  findAllPublic() {
    return this.postsService.findAllPublic();
  }

  @UseGuards(JwtAuthGuard)
  @Get('for-user')
  findAllForUser(@User() user: UserEntity) {
    console.log('%c⧭', 'color: #ffa280', 'for this user', user);
    return this.postsService.findAllForUser(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
