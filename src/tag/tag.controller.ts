import { ApiTags } from '@nestjs/swagger';
import { TagService } from './tag.service';
import { Controller, Get } from '@nestjs/common';
@ApiTags('Tags')
@Controller({
  version: '1',
  path: 'tags',
})
@Controller('tag')
export class TagController {
	constructor(
		private readonly tagService: TagService,
	) { }

	@Get()
	async getNames(): Promise<{ tags: string[] }> {
		const tags = await this.tagService.findAll();

		return {
			tags: tags.map((tag) => tag.name),
		}
	}
}
