import { Body, Controller, Delete, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { ArticleService } from './article.service';
import { User } from 'src/user/decorators/user.decorator';
import { CreateArticleDto } from './dto/createArticle.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { ArticleResponseInterface } from './types/articleResponse.interface';

@Controller('articles')
export class ArticleController {
	constructor(
		private readonly articleService: ArticleService
	) { }

	@Post()
	@UsePipes(ValidationPipe)
	@UseGuards(AuthGuard)
	async create(
		@User() currentUser: UserEntity,
		@Body('article') createArticleDto: CreateArticleDto,
	): Promise<ArticleResponseInterface> {
		const article = await this.articleService.createAritcle(currentUser, createArticleDto);
		return this.articleService.buildArticleResponse(article);
	}

	@Get(":slug")
	async getOne(@Param("slug") slug: string): Promise<ArticleResponseInterface> {
		const article = await this.articleService.findBySlug(slug);
		return this.articleService.buildArticleResponse(article);
	}

	@Delete(":slug")
	@UseGuards(AuthGuard)
	async delete(@Param("slug") slug: string, @User() user: UserEntity) {
		return this.articleService.delete(slug, user);
	}
}
