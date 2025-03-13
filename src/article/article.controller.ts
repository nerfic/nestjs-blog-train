import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';

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

    @Post()
    async createArticle(@Body() createArticleDto: CreateArticleDto) {
        return this.articleService.createArticle(createArticleDto)
    }

}
