import { LoginUserDto } from './dto/login-user.dto';
import { UserResponseInterface } from './types/userResponse.interface';
import { JWT_TOKEN } from './../config';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { sign } from 'jsonwebtoken';
import { compare } from "bcrypt";


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {

    const userByEmail = await this.userRepository.findOne({
      where: { email: createUserDto.email }
    });

    const userByUsername = await this.userRepository.findOne({
      where: { username: createUserDto.username }
    });

    if (userByEmail || userByUsername) {
      throw new HttpException('Email or username is already taken', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const newUser = new UserEntity();
    Object.assign(newUser, createUserDto);
    return await this.userRepository.save(newUser);
  }

  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { email: loginUserDto.email },
      select: ['id', 'username', 'email', 'bio', 'image', 'password'],
    });

    if (!user) {
      throw new HttpException('Invalid Credentials', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const validUser = await compare(loginUserDto.password, user.password);

    if (!validUser) {
      throw new HttpException('Invalid Credentials', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    delete user.password;
    return user;
  }

  async findOneById(id: number): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { id: id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id: id } });
    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  generateJwt(user: UserEntity): string {
    return sign({
      id: user.id,
      username: user.username,
      email: user.email,
    },
      JWT_TOKEN
    );
  }

  buildUserResponse(user: UserEntity): UserResponseInterface {
    return {
      user: {
        ...user,
        token: this.generateJwt(user)
      }
    }
  }
}
