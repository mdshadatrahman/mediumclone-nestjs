import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { ArticleService } from './article.service';
import { User } from 'src/user/decorators/user.decorator';
import { CreateArticleDto } from './dto/createArticle.dto';
import { UserEntity } from 'src/user/entities/user.entity';

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
	) {
		return this.articleService.createAritcle(currentUser, createArticleDto);
	}
}
