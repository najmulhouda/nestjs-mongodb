import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import { UserSetting } from './../schemas/UserSetting.schema';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    @InjectModel(UserSetting.name)
    private UserSettingModel: Model<UserSetting>,
  ) {}

  async createUser({ setting, ...createUserDto }: CreateUserDto) {
    if (setting) {
      const newSettings = new this.UserSettingModel(setting);
      const savedNewSettings = await newSettings.save();
      const newUser = new this.userModel({
        ...createUserDto,
        setting: savedNewSettings._id,
      });
      return newUser.save();
    }
    const newUser = new this.userModel(createUserDto);

    return newUser.save();
  }

  getUsers() {
    return this.userModel.find().populate(['setting', 'posts']);
  }

  getUserById(id: string) {
    return this.userModel.findById(id).populate('setting');
  }

  updateUser(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }

  deleteUser(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
