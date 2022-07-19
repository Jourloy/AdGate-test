import { Column } from "typeorm";

export class User {
	@Column()
	email: string;
	
	@Column()
	password: string;
	
	@Column()
	role: string;
}
