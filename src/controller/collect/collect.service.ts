import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CollectEntity } from '../../entitys/collect.entity';


@Injectable()
export class CollectService {
    constructor(
        @InjectRepository(CollectEntity)
        private readonly collectRepository: Repository<CollectEntity>,
    ) { }

    /**
     * 查询全部收藏
     * @param userId 
     * @returns 
     */
    async findCollectByUserId(query): Promise<CollectEntity[]> {
        return await this.collectRepository.find(query);
    }

    async insertCollect(data: CollectEntity): Promise<number> {
        const group = this.collectRepository.create(data);
        const res = await this.collectRepository.insert(group);
        return res.raw.insertId;
    }
    async updateCollect(data): Promise<CollectEntity | Boolean> {
        const { id, content, origin, desc } = data;
        const collect = await this.collectRepository.findOne(id);
        if (!collect) return false;
        collect.content = content || collect.content;
        collect.origin = origin || collect.origin;
        collect.desc = desc || collect.desc;
        return await this.collectRepository.save(collect);
    }
}
