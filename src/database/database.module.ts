import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule, ConfigService} from "@nestjs/config";

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				type: `postgres`,
				host: configService.get(`PG_HOST`),
				port: configService.get(`PG_PORT`),
				username: configService.get(`PG_USER`),
				password: configService.get(`PG_PASS`),
				database: configService.get(`PG_DB`),
				entities: [__dirname + `/../**/*.entity{.ts,.js}`],
				synchronize: false,
				migrationsRun: true,
				logging: true,
				logger: `file`,
				migrations: [__dirname + `/database/migrations/**/*{.ts,.js}`],
				cli: {
					migrationsDir: `src/database/migrations`,
				},
			}),
			inject: [ConfigService],
		}),
	],
	controllers: [],
	providers: []
})
export class DatabaseModule {
}
