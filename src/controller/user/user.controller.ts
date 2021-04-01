import { Controller, Get, Post, Body, Headers, Response, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { UserEntity } from '../../entitys/user.entity';
import { AuthService } from '../auth/auth.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) { }

  // 获取全部用户
  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll(@Headers() headers) {
    console.log(headers);
    return await this.userService.findAllUser();
  }

  // 根据id查询用户
  @Get('/:id')
  async getUser(@Param() param) {
    const { id } = param;
    return await this.userService.findById(id);
  }

  // 更新用户信息(不包括账号密码)
  @UseGuards(AuthGuard('jwt'))
  @Post('/update')
  async updateUser(@Body() body: UserEntity) {
    const { id } = body;
    if (!id) return { code: '1111' };
    delete body.password
    delete body.userName
    const res = await this.userService.updateUser(body);
    return res.raw.changedRows || { code: '3333', message: '更新数据失败' }
  }

  @Post('/login')
  async login(@Body() loginParmas: any) {
    console.log('JWT验证 - Step 1: 用户请求登录');
    const authResult = await this.authService.validateUser(loginParmas.userName, loginParmas.password);
    const action = {
      1: this.authService.certificate(authResult.user),
      2: { code: '1111', message: '账号或密码不正确', },
      0: { code: '1111', message: '查无此人', },
    };
    return action[authResult.code] || action[0];
  }
}
