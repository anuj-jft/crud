import { BadRequestException, CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { UsersService } from "src/users/users.service";
import { CurrentUserDto } from "src/utils/dto/current-user.dto";
import { UtilsService } from "src/utils/utils.service";

@Injectable()
export class LocalAuthGuard implements CanActivate {
	constructor(
		private usersService: UsersService,
		private utilsService: UtilsService
	) { }
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const { email, password } = request.body;
		const currentUserDto = await this.validateUser(email, password);
		request.currentUser = currentUserDto;
		return !!currentUserDto;

	}

	async validateUser(email: string, password: string): Promise<CurrentUserDto> {
		const user = await this.usersService.getUserByEmail(email);
		console.log(user)
		if (!user) throw new BadRequestException('Invalid user');
		const isValidated = this.utilsService.comparePasswords(password, user.password);
		if (isValidated) {
			return new CurrentUserDto(user);
		}
	}
}