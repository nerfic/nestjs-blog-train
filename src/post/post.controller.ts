import { BadRequestException, Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) { }

    @Get()
    handleMissingId() {
        throw new BadRequestException("ID is required. Use /post/{id}.");
    }

    @Get(':id')
    async getPost(@Param('id') id: string) {
        const post = this.postService.getPost(id);
        if (!post) {
            throw new NotFoundException(`Post ${id} not found.`);
        }
        return post;
    }
}
