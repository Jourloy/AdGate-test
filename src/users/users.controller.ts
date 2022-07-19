import {
	Body,
	Controller,
	Delete,
	Get,
	Patch,
	Post,
	Res,
	UseGuards
} from "@nestjs/common";
import { CreateDto } from "./dto/create.dto";
import { Response } from "express";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ChangeDto } from "./dto/change.dto";
import { User } from "../decorators/user.decorator";
import { CurrentUserDec } from "../../types";
import { JwtGuard } from "../guards/jwt.guard";
import { UserService } from "./users.service";
import { RoleGuard } from "../guards/roles.guard";
import { Roles } from "../decorators/roles.decorator";

@ApiTags(`User`)
@ApiBearerAuth()
@Controller(`user`)
export class UserController {
	constructor(private readonly userService: UserService) {
	}
	
	@Post(``)
	@Roles(`administrator`)
	@UseGuards(JwtGuard)
	@UseGuards(RoleGuard)
	@ApiResponse({ status: 200, description: `User created and token returned` })
	@ApiResponse({ status: 400, description: `User cannot be added in database` })
	async create(@Body() opt: CreateDto, @Res() r: Response) {
		const res = await this.userService.create(opt);
		r.status(res.error !== true ? 200 : 400).json(res);
	}
	
	@Get(``)
	@Roles(`administrator`)
	@UseGuards(RoleGuard)
	@UseGuards(JwtGuard)
	@ApiResponse({ status: 200, description: `Returned array with all users` })
	async findAll(@Res() r: Response, @User() user: CurrentUserDec) {
		const res = await this.userService.getAll();
		r.status(200).json({ users: res });
	}
	
	@Patch(`/change`)
	@Roles(`administrator`)
	@UseGuards(RoleGuard)
	@UseGuards(JwtGuard)
	@ApiResponse({ status: 200, description: `User data successfully changed` })
	@ApiResponse({ status: 400, description: `User data cannot be changed` })
	async change(@Body() opt: ChangeDto, @User() user: CurrentUserDec, @Res() r: Response) {
		const res = await this.userService.change(opt);
		r.status(res != null ? 200 : 400).send(`OK`);
	}
	
	@Delete(`/remove`)
	@Roles(`administrator`)
	@UseGuards(RoleGuard)
	@UseGuards(JwtGuard)
	@ApiResponse({ status: 200, description: `User successfully removed` })
	@ApiResponse({ status: 400, description: `User cannot be removed` })
	async remove(@User() user: CurrentUserDec, @Res() r: Response) {
		const res = await this.userService.remove(user.username);
		r.status(res ? 200 : 400).send(res ? `OK` : `Error`);
	}
}
