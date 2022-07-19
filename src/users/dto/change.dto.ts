import {ApiProperty} from "@nestjs/swagger";
import {IsString} from "class-validator";

export class ChangeDto {
	@ApiProperty({
		name: `Username`,
		description: `Name for user account`,
		example: `Jourloy`,
		required: false
	})
	@IsString()
	username: string;

	@ApiProperty({
		name: `Role`,
		description: `Role of user (admin, mod or user)`,
		default: `user`,
		required: false,
	})
	@IsString()
	role: string;
}