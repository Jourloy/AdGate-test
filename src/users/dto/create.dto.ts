import {IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateDto {
	@ApiProperty({
		name: `Username`,
		description: `Name for user account`,
		example: `Jourloy`,
		required: true
	})
	@IsString()
	username: string;

	@ApiProperty({
		name: `Password`,
		description: `Password for user account`,
		example: `ThisIsMyPassword`,
		required: true
	})
	@IsString()
	password: string;
}