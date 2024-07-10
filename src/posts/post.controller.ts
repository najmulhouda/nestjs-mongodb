import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { CreatePostDto } from './dtos/CreatePost.dto';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private postsService: PostService) {}

  @Post()
  createPost(@Body(ValidationPipe) createPostDto: CreatePostDto) {
    return this.postsService.createPost(createPostDto);
  }
}
