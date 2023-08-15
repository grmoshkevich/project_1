import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode } from '@nestjs/common';
import { VotesService } from './votes.service';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/user.decorator';
import { User as UserEntity } from 'src/users/entities/user.entity';

@Controller('votes')
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(200)
  create(@Body() createVoteDto: CreateVoteDto, @User() user: UserEntity) {
    return this.votesService.create(createVoteDto, user);
  }

  @Get()
  findAll() {
    return this.votesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.votesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVoteDto: UpdateVoteDto) {
    return this.votesService.update(+id, updateVoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.votesService.remove(+id);
  }
}
