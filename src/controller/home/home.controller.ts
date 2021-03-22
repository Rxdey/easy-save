import { Controller, Render, Get, Post, Body, HttpStatus, HttpCode, Response, Param, Query } from '@nestjs/common';

@Controller('/')
export class HomeController {
  @Get()
  @Render('index.hbs')
  async home(@Query() param) {
    return { message: '欢迎', code: '1111' };
  }
}
