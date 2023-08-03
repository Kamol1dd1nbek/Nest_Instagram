import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from "express";
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("Users")
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  registration(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response
    ) {
    return this.userService.registration(createUserDto, res);
  }
}
