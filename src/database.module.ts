// database.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Post } from './posts/entities/post.entity';
import { Vote } from './votes/entities/vote.entity';
import { ConfigModule } from '@nestjs/config';

console.log('%c⧭', 'color: #e5de73', process.env.DB_HOST);


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      password: process.env.DB_PASSWORD,
      username: process.env.DB_USERNAME,
      entities: [User, Post, Vote],
      database: process.env.DB_NAME,
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
