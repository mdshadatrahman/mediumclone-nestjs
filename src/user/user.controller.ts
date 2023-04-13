import { LoginUserDto } from './dto/login-user.dto';
import { UserResponseInterface } from './types/userResponse.interface';
import { Controller, Get, Post, Body, UsePipes, ValidationPipe, Req, UseGuards, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './decorators/user.decorator';
import { UserEntity } from './entities/user.entity';
import { AuthGuard } from './guards/auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Users')
@Controller({
  version: '1',
  path: 'users',
})
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
  @UseGuards(AuthGuard)
  async currentUser(
    @User() user: UserEntity,
  ): Promise<UserResponseInterface> {
    return this.userService.buildUserResponse(user);
  }

  @Put()
  @UseGuards(AuthGuard)
  async update(
    @User('id') currentUserId: number,
    @Body('user') updateUserDto: UpdateUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.update(currentUserId, updateUserDto);
    return this.userService.buildUserResponse(user);
  }
}
