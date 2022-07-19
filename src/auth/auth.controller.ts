import { Body, Controller, Post, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserDto } from "./dto/user.dto";
import { Response } from "express";

@ApiTags(`Auth`)
@ApiBearerAuth()
@Controller(`auth`)
export class AuthController {
	constructor(private readonly authService: AuthService) {
	}
	
	@Post(`/login`)
	@ApiResponse({ status: 200, description: `User successfully login` })
	@ApiResponse({ status: 400, description: `User cannot login` })
	async login(@Body() opt: UserDto, @Res() r: Response) {
		const res = await this.authService.login(opt);
		r.status(res.error !== true ? 200 : 400).json(res);
	}
	
	@Post(`/signup`)
	@ApiResponse({ status: 200, description: `User created and token returned` })
	@ApiResponse({ status: 400, description: `User cannot be added in database` })
	async signup(@Body() opt: UserDto, @Res() r: Response) {
		const res = await this.authService.signup(opt);
		r.status(res.error !== true ? 200 : 400).json(res);
	}
}
