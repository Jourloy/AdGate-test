import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { ParseService } from "./parse.service";
import { Server } from "socket.io";
import { Logger } from "@nestjs/common";

@WebSocketGateway(3001,{
	cors: {
		origin: `*`,
	},
})
export class ParseGateway {
	constructor(private readonly parseService: ParseService) {
	}
	
	private logger = new Logger(ParseGateway.name);
	
	@WebSocketServer()
	server: Server;
	
	@SubscribeMessage(`parsing`)
	create() {
		return this.parseService.getGarantex();
	}
}
