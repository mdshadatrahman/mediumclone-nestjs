import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto implements Readonly<CreateUserDto>{
	@ApiProperty({
		example: 'shadat@gmail.com',
	})
	@IsNotEmpty()
	readonly username: string;


	@ApiProperty({
		example: 'shadat',
	})
	@IsNotEmpty()
	@IsEmail()
	readonly email: string;


	@ApiProperty({
		example: '123123',
	})
	@IsNotEmpty()
	readonly password: string;
}
