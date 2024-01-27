import { Exclude } from "class-transformer";
import { IsDate, IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Role } from "./../../database/entities/Role.entity";


export class UserResponseDto {
	@IsString()
	fname: string;

	@IsEmail()
	email: string;

	@Exclude()
	password: string;

	@IsString()
	mobile: string;

	@IsString()
	whatsapp: string;

	@IsDate()
	lastLogin: Date;

	@IsString()
	city: string;

	@IsNotEmpty()
	role: Role;
}