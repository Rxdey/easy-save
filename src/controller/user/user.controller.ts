import { Controller, Get, Post, Body, HttpStatus, Response, Param } from '@nestjs/common';
import { UserService } from './user.service';
// import { Request, Response, NextFunction } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }
  @Get()
  findAll() {
    return this.userService.find();
  }

  @Get('/:id')
  getUser(@Response() response, @Param('id') id) {
    return this.userService.findOne(id);
  }
}
