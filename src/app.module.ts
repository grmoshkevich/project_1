import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { VotesModule } from './votes/votes.module';
import { DatabaseModule } from './database.module';

@Module({
  imports: [
    // AuthModule,
    // UsersModule, 
    DatabaseModule,
    UsersModule,
    PostsModule,
    VotesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
