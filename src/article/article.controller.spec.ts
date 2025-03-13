import { Test, TestingModule } from '@nestjs/testing';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article';

const mockArticleService = {
  createArticle: jest.fn(),
  getArticle: jest.fn(),
  getAllArticles: jest.fn(),
};

describe('ArticleController', () => {
  let controller: ArticleController;
  let service: ArticleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticleController],
      providers: [
        { provide: ArticleService, useValue: mockArticleService },
      ],
    }).compile();

    controller = module.get<ArticleController>(ArticleController);
    service = module.get<ArticleService>(ArticleService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createArticle', () => {
    it('should successfully create an article', async () => {
      const createArticleDto: CreateArticleDto = {
        title: 'Article title',
        content: 'Article content',
        tags: ['tag1', 'tag2'],
      };

      mockArticleService.createArticle.mockResolvedValue({
        id: '1',
        ...createArticleDto,
        createdAt: new Date(),
        updatedAt: new Date(),
        user: 'user_id',
      });

      const result = await controller.createArticle(createArticleDto);
      expect(result).toEqual({
        id: '1',
        ...createArticleDto,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        user: 'user_id',
      });
      expect(mockArticleService.createArticle).toHaveBeenCalledWith(createArticleDto);
    });
  });

  describe('getArticle', () => {
    it('should return an article by id', async () => {
      const articleId = '1';
      const article = {
        id: articleId,
        title: 'Article title',
        content: 'Article content',
        tags: ['tag1', 'tag2'],
        createdAt: new Date(),
        updatedAt: new Date(),
        user: 'user_id',
      };

      mockArticleService.getArticle.mockResolvedValue(article);

      const result = await controller.getArticle(articleId);
      expect(result).toEqual(article);
      expect(mockArticleService.getArticle).toHaveBeenCalledWith(articleId);
    });

    it('should throw an error if article is not found', async () => {
      const articleId = '67d2d783942c0508112c9cce';
      mockArticleService.getArticle.mockResolvedValue(null);

      await expect(controller.getArticle(articleId)).rejects.toThrowError('Article not found');
    });
  });

  describe('getAllArticles', () => {
    it('should return a list of articles', async () => {
      const articles = [
        {
          id: '1',
          title: 'Article 1',
          content: 'Content 1',
          tags: ['tag1'],
          createdAt: new Date(),
          updatedAt: new Date(),
          user: 'user_id',
        },
        {
          id: '2',
          title: 'Article 2',
          content: 'Content 2',
          tags: ['tag2'],
          createdAt: new Date(),
          updatedAt: new Date(),
          user: 'user_id',
        },
      ];

      mockArticleService.getAllArticles.mockResolvedValue(articles);

      const result = await controller.getAllArticles();
      expect(result).toEqual(articles);
      expect(mockArticleService.getAllArticles).toHaveBeenCalled();
    });
  });
});
