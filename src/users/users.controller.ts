import { Body, Controller, Delete, Get, Param, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserTypes } from 'src/database/enums/user-type.enum';
import { CurrentUser } from 'src/decorator/current-user.decorator';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import RoleGuard from 'src/guard/role.guard';
import { CurrentUserDto } from 'src/utils/dto/current-user.dto';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';

@UseGuards(JwtAuthGuard)
@Controller('users')
@ApiTags('User')
export class UsersController {
	constructor(private usersService: UsersService) { }
	@UseGuards(RoleGuard([UserTypes.ADMIN]))
	@Get('/')
	async getAllUserController() {
		return await this.usersService.getAllUsersList()
	}

	@UseGuards(RoleGuard([UserTypes.ADMIN, UserTypes.USER]))
	@Get('/:id')
	async getSingleUserController(@Param('id') userId: string) {
		return await this.usersService.getSingleUserService(userId)
	}

	@UseGuards(RoleGuard([UserTypes.ADMIN, UserTypes.USER]))
	@Put('/:id')
	async updateUserController(@Body() userDto: UserDto, @Param('id') userId: string, @CurrentUser() currentUser: CurrentUserDto) {
		return await this.usersService.updateUserService(userId, userDto, currentUser)
	}

	@UseGuards(RoleGuard([UserTypes.ADMIN]))
	@Delete('/:id')
	async deleteUserController(@Param('id') userId: string, @CurrentUser() currentUser: CurrentUserDto) {
		return await this.usersService.deleteUserService(userId, currentUser)
	}

	@UseGuards(RoleGuard([UserTypes.ADMIN]))
	@Delete('/:id')
	async receiveDonationController(@Param('id') userId: string, @CurrentUser() currentUser: CurrentUserDto) {
		return await this.usersService.deleteUserService(userId, currentUser)
	}
}
