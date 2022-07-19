import {Injectable, NestMiddleware} from '@nestjs/common';
import {Request, Response} from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: () => void) {
		let token = null;
		const headers = req.headers;
		const l = {
			username: ``,
			role: ``,
			token: ``,
		};

		if (headers[`authorization`]) {
			if (
				headers[`authorization`].split(` `)[0] === `Bearer` &&
				headers[`authorization`].split(` `)[1] != null
			) {
				token = headers[`authorization`].split(` `)[1];
			}
		}

		if (token) {
			try {
				const decode = jwt.decode(token);
				l.username = decode[`username`];
				l.role = decode[`role`];
				l.token = token;
			} catch (e) {
				res.locals = l;
				next();
			}
		}
		res.locals = l;
		next();
	}
}
