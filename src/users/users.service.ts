import { Injectable } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import * as crypto from "crypto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>,
	) {
	}
	
	/**
	 * This function creates a new user in the database
	 * @param {UserCreate} opt - UserCreate
	 * @returns An object with two properties: error and token.
	 */
	public async create(opt: UserCreate): Promise<UserCreateReturn> {
		const _user = await this.getOneByEmail(opt.email);
		
		if (_user) return { error: true };
		
		const token = this.generateToken(opt.email, `user`);
		const pass = crypto
			.createHash(`sha256`)
			.update(opt.password)
			.digest(`hex`);
		
		await this.userRepository.insert({
			email: opt.email,
			password: pass,
			role: `user`,
		});
		
		return { error: false, token: token };
	}
	
	/**
	 * It returns a user object from the database, based on the email address passed in
	 * @param {string} email - string - This is the email of the user we want to find.
	 * @returns The user object
	 */
	public async getOneByEmail(email: string) {
		return this.userRepository.findOne({ email: email });
	}
	
	/**
	 * It returns a promise that resolves to an array of all the users in the database
	 * @returns An array of all the users in the database.
	 */
	public async getAll() {
		return this.userRepository.find();
	}
	
	/**
	 * It takes an object with an email and a role, finds the user with that email, changes the
	 * user's role to the new role, and returns the user
	 * @param {UserChange} opt - UserChange
	 * @returns The user object
	 */
	public async change(opt: UserChange) {
		const user = await this.getOneByEmail(opt.email);
		if (opt.email) user.email = opt.email;
		if (opt.role) user.role = opt.role;
		await this.userRepository.save(user);
		return user;
	}

	/**
	 * It removes a user from the database
	 * @param {string} email - string - the email of the user to be removed
	 * @returns A boolean value.
	 */
	public async remove(email: string) {
		const u = await this.getOneByEmail(email);
		return await this.userRepository.remove(u)
			.then(() => true)
			.catch(() => false);
	}
	
	/**
	 * It takes an email and a role, and returns a token that expires in 6 hours
	 * @param {string} email - The email of the user
	 * @param {string} role - The role of the user.
	 * @returns A token that is signed with the secret and expires in 6 hours.
	 */
	public generateToken(email: string, role: string) {
		return jwt.sign({ email: email, role: role}, process.env.SECRET, { expiresIn: `6h` });
	}
}

interface UserCreateReturn {
	error: boolean;
	token?: string;
}

interface UserCreate {
	email: string;
	password: string;
}

interface UserChange {
	email?: string;
	role?: string;
}