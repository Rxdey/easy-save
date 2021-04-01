import { Controller, Render, Get, Post, Body, HttpStatus, HttpCode, Response, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GroupService } from './group.service';
// import { UserGroupEntity } from '../../entitys/userGroup.entity';
import { CurrentUser } from '../auth/auth.getUser';
import { JwtUser } from '../../interface/global.interface';

@Controller('/group')
export class GroupController {
  constructor(
    private readonly groupService: GroupService
  ) {}

  @Get('/')
  @UseGuards(AuthGuard('jwt'))
  async GetGroupByUserId(@CurrentUser() user: JwtUser) {
    console.log(user);
    const { userId } = user;
    if (!userId) return { code: '1111' };
    return await this.groupService.findGroupByUserId(userId);
  }
}
