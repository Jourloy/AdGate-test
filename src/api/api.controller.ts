import { Controller, Get, Res, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { ApiService } from "./api.service";
import { Roles } from "../decorators/roles.decorator";
import { JwtGuard } from "../guards/jwt.guard";
import { RoleGuard } from "../guards/roles.guard";

@ApiTags(`API`)
@ApiBearerAuth()
@Controller(`api`)
export class ApiController {
	constructor(private readonly apiService: ApiService) {
	}
	
	@Get(`/startParse`)
	@Roles(`administrator`)
	@UseGuards(JwtGuard)
	@UseGuards(RoleGuard)
	@ApiResponse({ status: 200, description: `Parsing is on` })
	switchOn(@Res() r: Response) {
		this.apiService.changeSwitch(true);
		r.status(200).send(`OK`);
	}
	
	@Get(`/stopParse`)
	@Roles(`administrator`)
	@UseGuards(JwtGuard)
	@UseGuards(RoleGuard)
	@ApiResponse({ status: 200, description: `Parsing is off` })
	switchOff(@Res() r: Response) {
		this.apiService.changeSwitch(false);
		r.status(200).send(`OK`);
	}
}
