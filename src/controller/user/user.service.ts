import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) { }

  async find(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }
  async findOne(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne({ id });
  }
}
