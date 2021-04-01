import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserGroupEntity } from '../../entitys/userGroup.entity';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(UserGroupEntity)
    private readonly userGroupRepository: Repository<UserGroupEntity>,
  ) { }

  async findGroupByUserId(userId): Promise<UserGroupEntity[]> {
    return await this.userGroupRepository.find();
  }
}
