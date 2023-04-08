import { Injectable } from '@nestjs/common';

@Injectable()
export class ArticleService {
	async createAritcle() {
		return 'Create article from service';
	}

}
