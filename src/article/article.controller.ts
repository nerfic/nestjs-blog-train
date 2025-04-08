import { Body, Controller, Get, NotFoundException, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) { }

    @Get()
    async getAllArticles() {
        return this.articleService.getAllArticles()
    }

    @Get(':id')
    async getArticle(@Param('id') id: string) {
        const article = await this.articleService.getArticle(id)
        if (!article) {
            throw new NotFoundException(`Article ${id} not found`);
        }
        return article
    }

    @UseGuards(AuthGuard)
    @Post()
    async createArticle(@Body() createArticleDto: CreateArticleDto, @Req() req) {
        return this.articleService.createArticle(createArticleDto, req.user.sub)
    }

}
