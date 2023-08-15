import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    // private dataSource: DataSource
  ) {}
  
  // private readonly users = [
  //   {
  //     userId: 1,
  //     username: 'john',
  //     password: 'changeme',
  //   },
  //   {
  //     userId: 2,
  //     username: 'monkeyboy',
  //     password: '$2b$10$OazGA5.ePu08alQnBg3dOeBRcf6N2XfGtwLfhNWpl.nTXRrC/bXgq',
  //   },
  // ];

  // async findOne(username: string): Promise<any> {
  //   return this.users.find(user => user.username === username);
  // }

  findOne(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await hash(createUserDto.password, 10);
    const user = this.userRepository.create({ ...createUserDto, password: hashedPassword });
    return this.userRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }


  async findByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ username });
  }
  
  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  // async createMany() {
  //   const queryRunner = this.dataSource.createQueryRunner();
  
  //   await queryRunner.connect();
  //   await queryRunner.startTransaction();
  //   try {
  //     const user: CreateUserDto = {
  //       username: 'bananaman',
  //       password: '123',
  //     }
  //     await queryRunner.manager.save(user);
  //     // await queryRunner.manager.save(users[1]);
  
  //     await queryRunner.commitTransaction();
  //   } catch (err) {
  //     console.log('%c⧭', 'color: #0088cc', err);
  //     // since we have errors lets rollback the changes we made
  //     await queryRunner.rollbackTransaction();
  //   } finally {
  //     // you need to release a queryRunner which was manually instantiated
  //     await queryRunner.release();
  //   }
  // }
  
}
