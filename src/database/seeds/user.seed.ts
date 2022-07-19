/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
import { createConnection } from "typeorm";
import { User } from "../../users/entities/user.entity";
import * as crypto from "crypto";
import * as path from "path";
require(`dotenv`).config();

const env = process.env;

console.log(`[USER.seed.ts] Start`);
const time = Date.now();

createConnection({
	type: `postgres`,
	host: env.PG_HOST,
	port: parseInt(env.PG_PORT),
	database: env.PG_DB,
	username: env.PG_USER,
	password: env.PG_PASS,
	synchronize: false,
	migrationsRun: true,
	logging: true,
	logger: `file`,
	migrations: [path.join(__dirname, `/migrations/**/*{.ts,.js}`)],
	entities: [User],
	cli: {
		migrationsDir: `src/database/migrations`
	}
})
	.then(async (connection) => {
		const rep = connection.getRepository(User);
		const _u = await rep.findOne({ email: `admin@email.com` });
		const pass = crypto.createHash(`sha256`)
			.update(`ThisIsAdminPassword`)
			.digest(`hex`);
		if (!_u) {
			const user = new User();
			user.email = `admin@email.com`;
			user.password = pass;
			user.role = `administrator`;
			await rep.save(user);
		}
		console.log(`[USER.seed.ts] Success (${Math.round((Date.now() - time) / 1000)}s)`);
	})
	.catch((error) => console.log(`[USER.seed.ts] Error: ${error}`));