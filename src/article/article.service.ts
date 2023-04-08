import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/createArticle.dto';
import { ArticleEntity } from './article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { ArticleResponseInterface } from './types/articleResponse.interface';
import slugify from 'slugify';
import { UpdateArticleDto } from './dto/updateArticle.dto';

@Injectable()
export class ArticleService {
	constructor(
		@InjectRepository(ArticleEntity)
		private readonly articleRepository: Repository<ArticleEntity>,
	) { }
	async createAritcle(currentUser: UserEntity, createArticleDto: CreateArticleDto): Promise<ArticleEntity> {
		const article = new ArticleEntity();
		Object.assign(article, createArticleDto);

		if (!article.tagList) {
			article.tagList = [];
		}

		article.author = currentUser;
		article.slug = this.getSlug(article.title);

		return await this.articleRepository.save(article);
	}

	async findBySlug(slug: string): Promise<ArticleEntity> {
		const article = await this.articleRepository.findOne({ where: { slug: slug } });
		if (!article) {
			throw new HttpException("Not found", HttpStatus.NOT_FOUND);
		}
		return article;
	}

	async delete(slug: string, user: UserEntity): Promise<DeleteResult> {
		const article = await this.findBySlug(slug);

		if (!article) {
			throw new HttpException("Article Not Found", HttpStatus.NOT_FOUND);
		}

		if (article.author.id !== user.id) {
			throw new HttpException("Unauthorized", HttpStatus.FORBIDDEN);
		}

		return await this.articleRepository.delete({ slug });
	}

	async update(slug: string, user: UserEntity, updateArticleDto: UpdateArticleDto): Promise<ArticleEntity> {
		const article = await this.findBySlug(slug);

		if (article.author.id !== user.id) {
			throw new HttpException('Not Authorized', HttpStatus.UNAUTHORIZED);
		}

		article.slug = this.getSlug(updateArticleDto.title);
		Object.assign(article, updateArticleDto);
		return await this.articleRepository.save(article);

		// return this.articleRepository.save({
		// 	...article,
		// 	...updateArticleDto
		// });
	}

	buildArticleResponse(article: ArticleEntity): ArticleResponseInterface {
		return { article };
	}

	private getSlug(title: string): string {
		return (
			slugify(title, { lower: true }) + '-' + ((Math.random() * Math.pow(36, 6)) | 0).toString(36)
		);
	}
}
