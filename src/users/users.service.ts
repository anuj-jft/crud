import { CurrentUserDto } from './../utils/dto/current-user.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './../database/entities/User.entity';
import { DataSource, DeepPartial } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { Role } from './../database/entities/Role.entity';
import { UserTypes } from './../database/enums/user-type.enum';
import { UtilsService } from './../utils/utils.service';
import { UserResponseDto } from './dto/user-resonse.dto';


@Injectable()
export class UsersService {

	constructor(private dataSource: DataSource, private utilsService: UtilsService) { }
	

	async getUserByEmail(email: string): Promise<User> {
		const user = await this.dataSource.getRepository(User).findOne({ where: { email } });
		if (!user) throw new NotFoundException('User not found');
		return user;
	}

	async getUserDetail(email: string, mobile: string): Promise<User>{
		let user = await this.dataSource.getRepository(User).findOne({where: {email}});
		if(user) return user;
		user = await this.dataSource.getRepository(User).findOne({where: {mobile}});
		return user
	}

	async getAllUsersList(): Promise<UserResponseDto[]> {
		const allUsers = await this.dataSource.getRepository(User).find();
		allUsers.forEach((user) => {
			delete user.password;
		})
		return allUsers;
	}

	async getSingleUserService(id: string): Promise<User> {
		const user = await this.dataSource.getRepository(User).findOne({ where: { id } })
		delete user.password;
		return user;
	}

	async createUserService(userDto: UserDto): Promise<any> {
		if (!userDto.role) {
			let role = await this.dataSource.getRepository(Role).findOne({ where: { role: UserTypes.USER } });
			if (!role) role = await this.dataSource.getRepository(Role).save({ role: UserTypes.USER });
			userDto.role = role;
		}
		const user = await this.dataSource.getRepository(User).save(userDto);
		if (user && user.id) {
			return {
				accessToken: await this.utilsService.jwtToken(user),
				...new CurrentUserDto(user)
			}
		}
	}

	async updateUserService(id: string, userDto: UserDto, currentUser: CurrentUserDto): Promise<User> {
		const user = await this.dataSource.getRepository(User).findOne({ where: { id } });
		user.updatedBy = currentUser.id;
		return await this.dataSource.getRepository(User).save(Object.assign(user, userDto))
	}

	async deleteUserService(id: string, currentUser: CurrentUserDto): Promise<string> {
		const user = await this.dataSource.getRepository(User).findOne({ where: { id } });
		user.updatedBy = currentUser.id;
		user.isDeleted = true;
		return await this.dataSource.getRepository(User).save(Object.assign(user))
	}

}
