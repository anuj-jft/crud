import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/database/entities/User.entity';
import { LocalAuthGuard } from 'src/guard/local-auth.guard';
import { CurrentUser } from 'src/decorator/current-user.decorator';
import { CurrentUserDto } from 'src/utils/dto/current-user.dto';
import { UsersService } from 'src/users/users.service';
import { ApiTags } from '@nestjs/swagger';
import { UserDto } from 'src/users/dto/user.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
	constructor(private authService: AuthService, private userService: UsersService) { }

	@Post('login')
	async loginController(@Body() loginDto: LoginDto): Promise<User> {
		return await this.authService.loginService(loginDto);
	}

	@Post('sign-up')
	async createUserController(@Body() userDto: UserDto): Promise<User> {
		return await this.userService.createUserService(userDto);
	}
}
