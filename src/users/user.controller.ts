import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import mongoose from 'mongoose';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  createUser(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    console.log(createUserDto, 'create user');
    return this.userService.createUser(createUserDto);
  }

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) {
      throw new HttpException('invalid id', 400);
    }
    const findUser = await this.userService.getUserById(id);
    if (!findUser) {
      throw new HttpException('user not found', 404);
    }
    return findUser;
  }
}
