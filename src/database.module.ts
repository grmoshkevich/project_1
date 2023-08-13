// database.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Post } from './posts/post.entity';
import { Vote } from './votes/vote.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'postgres',
      username: 'postgres',
      entities: [User, Post, Vote],
      database: 'project_1db',
      synchronize: true,
      logging: true,
    })
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'your_db_username',
    //   password: 'your_db_password',
    //   database: 'your_db_name',
    //   entities: [User, Post, Vote],
    //   synchronize: true, // Use migration scripts in production
    // }),
  ],
})
export class DatabaseModule {}
