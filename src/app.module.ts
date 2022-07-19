import { MiddlewareConsumer, Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { ApiModule } from "./api/api.module";
import { ParseModule } from "./parse/parse.module";
import { DatabaseModule } from "./database/database.module";
import { ScheduleModule } from "@nestjs/schedule";
import { AuthMiddleware } from "./middlewares/auth.middleware";

@Module({
	imports: [ScheduleModule.forRoot(), UsersModule, AuthModule, ApiModule, ParseModule, DatabaseModule],
	controllers: [],
	providers: []
})

export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AuthMiddleware).forRoutes(`*`);
	}
}