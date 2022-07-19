import { Injectable } from '@nestjs/common';
import axios from "axios";
import { Cron } from "@nestjs/schedule";

@Injectable()
export class ApiService {
	
	private parsed = [];
	private switch = false;
	
	/**
	 * It makes a request to the API, and then assigns the response to the parsed variable
	 */
	@Cron(`*/5 * * * * *`)
	private async parsing() {
		if (!this.switch) return;
		const url = `https://garantex.io/api/v2/otc/ads?direction=sell&amount=200000&currency=rub&payment_method=тинькофф`
		this.parsed = await axios.get(new URL(url).href)
			.then(d => d.data);
	}
	
	/**
	 * The function takes a boolean value and sets the switch to that value
	 * @param {boolean} on - boolean - This is the value that the switch will be set to.
	 */
	public changeSwitch(on: boolean) {
		this.switch = on;
	}
	
	/**
	 * Return parsed data
	 * @returns An array of the parsed arguments.
	 */
	public getParsed() {
		if (!this.switch) return [];
		return this.parsed;
	}
}
