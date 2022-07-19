import { Injectable } from "@nestjs/common";
import { ApiService } from "../api/api.service";

@Injectable()
export class ParseService {
	constructor(
		private apiService: ApiService,
	) {
	}
	
	public getGarantex() {
		return this.apiService.getParsed();
	}
}
