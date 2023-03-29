import { TagService } from './tag.service';
import { Controller, Get } from '@nestjs/common';

@Controller('tag')
export class TagController {
	constructor(
		private readonly tagService: TagService,
	) { }

	@Get()
	getNames(): string[] {
		return this.tagService.getNames();
	}
}
