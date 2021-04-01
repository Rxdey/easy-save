import { Module } from '@nestjs/common';
// import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { GroupEntity } from '../../entitys/group.entity';
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  // controllers: [GroupController],
  providers: [ GroupService ],
  imports: [TypeOrmModule.forFeature([GroupEntity]),],
  exports: [GroupService],
})

export class GroupModule { }
