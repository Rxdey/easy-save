import { Module } from '@nestjs/common';
import { CollectService } from './collect.service';
import { CollectEntity } from '../../entitys/collect.entity';
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  providers: [ CollectService ],
  imports: [TypeOrmModule.forFeature([CollectEntity]),],
  exports: [CollectService],
})

export class CollectModule { }
