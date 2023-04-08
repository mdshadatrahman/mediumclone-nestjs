import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { ArticleService } from './article.service';

@Controller('articles')
export class ArticleController {
	constructor(
		private readonly articleService: ArticleService
	) { }
	@Post()
	@UseGuards(AuthGuard)
	async create() {
		return this.articleService.createAritcle();
	}
}
