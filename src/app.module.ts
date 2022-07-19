import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { ApiModule } from './api/api.module';

@Module({
	imports: [UsersModule, AuthModule, ApiModule],
	controllers: [],
	providers: []
})

export class AppModule {
}
