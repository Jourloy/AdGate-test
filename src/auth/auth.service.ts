import { Injectable } from "@nestjs/common";
import * as crypto from "crypto";
import { UserService } from "../users/users.service";

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService
	) {
	}
	
	/**
	 * It takes a username and password, hashes the password, and then compares it to the hashed
	 * password in the database. If they match, it generates a token and returns it
	 * @param {AuthLogin} opt - AuthLogin - This is the parameter that is passed to the
	 * function. It is an object that has a username and password property.
	 * @returns An object with two properties, error and token.
	 */
	public async login(opt: AuthLogin): Promise<AuthLoginReturn> {
		const user = await this.userService.getOneByEmail(opt.email);
		const pass = crypto
			.createHash(`sha256`)
			.update(opt.password)
			.digest(`hex`);
		
		if (user && user.password === pass) {
			const token = this.userService.generateToken(opt.email);
			return { error: false, token: token };
		}
		return { error: true };
	}
	
	/**
	 * It creates a new user
	 * @param {AuthSignup} opt - AuthSignup
	 * @returns The user create object
	 */
	public async signup(opt: AuthSignup): Promise<AuthSignupReturn> {
		return await this.userService.create(opt);
	}
}

interface AuthSignup {
	email: string;
	password: string;
}

interface AuthLogin {
	email: string;
	password: string;
}

interface AuthSignupReturn {
	error: boolean;
	token?: string;
}

interface AuthLoginReturn {
	error: boolean;
	token?: string;
}