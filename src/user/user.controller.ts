import { LoginUserDto } from './dto/login-user.dto';
import { UserResponseInterface } from './types/userResponse.interface';
import { Controller, Get, Post, Body, UsePipes, ValidationPipe, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Request } from 'express';
import { ExpressRequest } from 'src/types/expressRequest.interface';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('/register')
  @UsePipes(new ValidationPipe())
  async create(@Body('user') createUserDto: CreateUserDto): Promise<UserResponseInterface> {
    const user = await this.userService.create(createUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Post('/login')
  @UsePipes(new ValidationPipe())
  async login(@Body('user') loginDto: LoginUserDto) {
    const user = await this.userService.login(loginDto);
    return this.userService.buildUserResponse(user);
  }

  @Get()
  async currentUser(@Req() request: ExpressRequest): Promise<UserResponseInterface> {
    return this.userService.buildUserResponse(request.user);
  }
}
