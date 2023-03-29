import { Injectable } from '@nestjs/common';

@Injectable()
export class TagService {
	getNames(): string[] {
		return ['tag1', 'tag2', 'tag3'];
	}
}
