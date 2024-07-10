import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from 'src/schemas/Post.schema';
import { User } from 'src/schemas/User.schema';
import { CreatePostDto } from './dtos/CreatePost.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async createPost({ userId, ...createPostDto }: CreatePostDto) {
    const findUser = await this.userModel.findById(userId);
    if (!findUser) {
      throw new HttpException('user not found', 404);
    }
    const newPost = new this.postModel(createPostDto);

    const savedPost = await newPost.save();
    await findUser.updateOne({ $push: { posts: savedPost._id } });
    return savedPost;
  }

  findPostById() {}
}
