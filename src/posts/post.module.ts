// import { Module, Post } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { PostSchema } from 'src/schemas/Post.schema';
// import { PostController } from './post.controller';
// import { PostService } from './post.service';

// @Module({
//   imports: [
//     MongooseModule.forFeature([
//       {
//         name: Post.name,
//         schema: PostSchema,
//       },
//     ]),
//   ],
//   controllers: [PostController],
//   providers: [PostService],
// })
// export class PostModule {}
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from 'src/schemas/Post.schema';

import { User, UserSchema } from 'src/schemas/User.schema';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Post.name,
        schema: PostSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
