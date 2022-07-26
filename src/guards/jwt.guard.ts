import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException
} from '@nestjs/common';
import {Observable} from 'rxjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtGuard implements CanActivate {
	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		const locals = context.switchToHttp().getResponse().locals;
		const token = locals.token;

		if (!token) throw new UnauthorizedException(`Not found JWT`);
		else {
			const decode = jwt.decode(token);
			if (!decode) throw new UnauthorizedException(`Can't decode`);

			try {
				jwt.verify(token, process.env.SECRET);
				return true;
			} catch (e) {
				throw new UnauthorizedException(`Can't verify`);
			}
		}
	}
}
