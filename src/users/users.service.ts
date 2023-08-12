import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private dataSource: DataSource
  ) {}

  async create(createUserDto: CreateUserDto) {
    console.log('%c⧭', 'color: #917399', createUserDto);
    await this.dataSource.transaction(async manager => {
      const user = manager.create(User, createUserDto)
      await manager.save(user);
      // await manager.save(users[1]);
    });
  
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async createMany() {
    const queryRunner = this.dataSource.createQueryRunner();
  
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const user: CreateUserDto = {
        id: 1,
        username: 'bananaman',
        isActive: true,
        password: '123',
      }
      await queryRunner.manager.save(user);
      // await queryRunner.manager.save(users[1]);
  
      await queryRunner.commitTransaction();
    } catch (err) {
      console.log('%c⧭', 'color: #0088cc', err);
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }
  
}
