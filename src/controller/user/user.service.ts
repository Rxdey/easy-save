import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../entitys/user.entity';
// import { UpdateUserInterface } from './user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) { }

  async findAllUser(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }
  async findById(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne({ id });
  }
  async findByName(userName: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ userName });
  }
  async updateUser(data: UserEntity) {
    const { id } = data;
    return await this.userRepository.update({ id }, data);
  }
}
