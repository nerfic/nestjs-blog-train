import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Article } from '@prisma/client';
import { CreateArticleDto } from './dto/create-article';

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

	async createArticle(createArticleDto: CreateArticleDto) {
		const { title, content, tags } = createArticleDto;

		const newArticle = await this.prisma.article.create({
			data: {
				title,
				content,
				tags,
				archived: false,
				user: "67d2d783942c0508112c9cce",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		});

		return newArticle
	}
}
