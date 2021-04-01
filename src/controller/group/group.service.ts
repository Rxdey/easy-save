import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GroupEntity } from '../../entitys/group.entity';


@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(GroupEntity)
    private readonly groupRepository: Repository<GroupEntity>,
  ) { }

  /**
   * 查询全部分组
   * @param userId 
   * @returns 
   */
  async findGroupByUserId(userId): Promise<GroupEntity[]> {
    return await this.groupRepository.find({ userId });
  }
  /**
   * 新建分组
   * @param createData 
   * @returns 
   */
  async createGroup(createData) {
    const group = this.groupRepository.create(createData);
    const res = await this.groupRepository.insert(group);
    return res.raw.insertId;
  }
}
