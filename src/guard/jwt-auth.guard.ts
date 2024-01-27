import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { UtilsService } from 'src/utils/utils.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
	constructor(private utilsService: UtilsService) { }

	canActivate(context: ExecutionContext): boolean {
		let token = ''
		const request = context.switchToHttp().getRequest();
		if (request.headers) token = this.extractTokenFromRequest(request);
		const currentUserDto = this.utilsService.verifyToken(token);
		request.currentUser = currentUserDto;

		return true;
	}

	private extractTokenFromRequest(request: Request): string {
		const [type, token] = request.headers.authorization?.split(' ');
		if (!type || type != "Bearer" || !token) {
			throw new UnauthorizedException()
		}
		return token;
	}
}