import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Article } from '@prisma/client';
import { CreateArticleDto } from './dto/create-article.dto';

@Injectable()
export class ArticleService {
	constructor(private readonly prisma: PrismaService) { }

	getArticle(id: string) {
		return this.prisma.article.findUnique({
			where: {
				id
			}
		})
	}

	getAllArticles(): Promise<Article[]> {
		return this.prisma.article.findMany()
	}

	async createArticle(createArticleDto: CreateArticleDto, userId: string) {
		const { title, content, tags } = createArticleDto;

		const newArticle = await this.prisma.article.create({
			data: {
				title,
				content,
				tags,
				archived: false,
				user: userId,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		});

		return newArticle
	}
}
