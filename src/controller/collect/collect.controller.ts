import { Controller, Render, Get, Post, Body, HttpStatus, HttpCode, Response, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CollectService } from './collect.service';
import { CurrentUser } from '../auth/auth.getUser';
import { JwtUser } from '../../interface/global.interface';
import { CollectEntity } from '../../entitys/collect.entity';
import { dateFormat } from '../../common/util';

@Controller('/collect')
export class CollectController {
    constructor(
        private readonly collectService: CollectService
    ) { }
    /**
     * 查询全部收藏
     *
     * @param {JwtUser} user
     * @param {*} param
     * @returns
     * @memberof CollectController
     */
    @Get('/')
    @UseGuards(AuthGuard('jwt'))
    async findAllByUser(@CurrentUser() user: JwtUser, @Param() param) {
        if (!user) return { code: '1111' };
        const { userId } = user;
        const { groupId = 0 } = param;
        return await this.collectService.findCollectByUserId({ userId, groupId: groupId, isShow: 1 });
    }

    /**
     * 添加收藏
     * @param {JwtUser} user
     * @param {CollectEntity} body
     * @returns
     * @memberof CollectController
     */
    @Post('/save')
    @UseGuards(AuthGuard('jwt'))
    async save(@CurrentUser() user: JwtUser, @Body() body: CollectEntity) {
        if (!user) return { code: '1111' };
        const { userId } = user;
        // const { type = 0, groupId = 0, content = '', origin, desc } = param;
        if (!body.content) return { code: '1111', message: '收藏内容不能为空' }
        body.createDate = dateFormat(new Date());
        return this.collectService.insertCollect({ ...body, userId })
    }

    /**
     * 更新收藏
     * @param {JwtUser} user
     * @param {CollectEntity} body
     * @returns
     * @memberof CollectController
     */
    @Post('/update')
    @UseGuards(AuthGuard('jwt'))
    async update(@CurrentUser() user: JwtUser, @Body() body: CollectEntity) {
        if (!user) return { code: '1111' };
        const { userId } = user;
        const { id, content = '', origin, desc } = body;
        if (!id) return { code: '1111', message: '收藏不存在' }
        body.createDate = dateFormat(new Date());
        const res = await this.collectService.updateCollect({ id, content, origin, desc })
        return res || { code: '1111', message: '该收藏不存在' };
    }

    /**
     * 删除收藏
     *
     * @param {JwtUser} user
     * @param {CollectEntity} body
     * @memberof CollectController
     */
    @Post('/delete')
    @UseGuards(AuthGuard('jwt'))
    async delete(@CurrentUser() user: JwtUser, @Body() body: CollectEntity) {
        if (!user) return { code: '1111' };
        const { userId } = user;
        const { id } = body;
        if (!id) return { code: '1111', message: '收藏不存在' }
    }
}
