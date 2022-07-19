import {IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateDto {
	@ApiProperty({
		name: `Email`,
		description: `Email of user`,
		example: `work@jourloy.com`,
		required: true
	})
	@IsString()
	email: string;

	@ApiProperty({
		name: `Password`,
		description: `Password for user account`,
		example: `ThisIsMyPassword`,
		required: true
	})
	@IsString()
	password: string;
}