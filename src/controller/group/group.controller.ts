import { Controller, Render, Get, Post, Body, HttpStatus, HttpCode, Response, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GroupService } from './group.service';
// import { GroupEntity } from '../../entitys/group.entity';
import { CurrentUser } from '../auth/auth.getUser';
import { JwtUser } from '../../interface/global.interface';

@Controller('/group')
export class GroupController {
  constructor(
    private readonly groupService: GroupService
  ) { }

  @Get('/')
  @UseGuards(AuthGuard('jwt'))
  async findAllByUser(@CurrentUser() user: JwtUser) {
    if (!user) return { code: '1111' };
    const { userId } = user;
    return await this.groupService.findGroupByUserId(userId)
  }
  // 新增分组
  @Post('/create')
  @UseGuards(AuthGuard('jwt'))
  async createGroup(@CurrentUser() user: JwtUser, @Body() body) {
    if (!user) return { code: '1111' };
    const { userId } = user;
    return await this.groupService.createGroup({ userId, ...body });
  }
}
