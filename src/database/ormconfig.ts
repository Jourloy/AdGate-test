import * as path from "path";
import * as fs from 'fs';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require(`dotenv`).config();

const env = process.env;
const conf = {
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
	entities: [`src/**/**/*.entity.ts`],
	cli: {
		migrationsDir: `src/database/migrations`,
	},
};

const config = JSON.stringify(conf);
fs.writeFileSync(path.join(__dirname, `/../../ormconfig.json`), config);
