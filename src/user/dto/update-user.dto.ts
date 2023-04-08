import { IsEmail } from "class-validator";

export class UpdateUserDto {
	readonly bio: string;

	readonly image: string;

	@IsEmail()
	readonly email: string;
}
