import { Module } from "@nestjs/common";
import { ParseService } from "./parse.service";
import { ParseGateway } from "./parse.gateway";
import { ApiModule } from "../api/api.module";

@Module({
	imports: [ApiModule],
	providers: [ParseGateway, ParseService]
})
export class ParseModule {
}
