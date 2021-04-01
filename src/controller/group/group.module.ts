import { Module } from '@nestjs/common';
// import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { UserGroupEntity } from '../../entitys/userGroup.entity';
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  // controllers: [GroupController],
  providers: [ GroupService ],
  imports: [TypeOrmModule.forFeature([UserGroupEntity]),],
  exports: [GroupService],
})

export class GroupModule { }
