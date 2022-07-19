import {ApiProperty} from "@nestjs/swagger";
import {IsString} from "class-validator";

export class ChangeDto {
	@ApiProperty({
		name: `Email`,
		description: `Email of user`,
		example: `work@jourloy.com`,
		required: true
	})
	@IsString()
	email: string;

	@ApiProperty({
		name: `Role`,
		description: `Role of user (admin, mod or user)`,
		default: `user`,
		required: false,
	})
	@IsString()
	role: string;
}