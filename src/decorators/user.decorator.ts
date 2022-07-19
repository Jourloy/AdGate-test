import {createParamDecorator, ExecutionContext} from '@nestjs/common';

export const User = createParamDecorator((data: unknown, context: ExecutionContext) => {
	const locals = context.switchToHttp().getResponse().locals;
	const role = locals.role;
	const username = locals.username;
	const token = locals.token;
	return {role: role, username: username, token: token};
});