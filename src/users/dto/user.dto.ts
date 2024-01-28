import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Role } from "./../../database/entities/Role.entity";


export class UserDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		description: 'Name of the user',
		type: String
	})
	fname: string;

	@IsString()
	@IsOptional()
	@ApiProperty({
		description: 'Last Name of the user',
		type: String
	})
	lname: string;

	@IsString()
	@IsOptional()
	@ApiProperty({
		description: 'Last Name of the user',
		type: String
	})
	gender: string;

	@IsEmail()
	@IsNotEmpty()
	@ApiProperty({
		description: 'Email of the user',
		type: String
	})
	email: string;

	@IsString()
	@IsOptional()
	@ApiProperty({
		description: 'Mobile number of the user',
		type: String
	})
	mobile: string;

	@IsString()
	@IsOptional()
	@ApiProperty({
		description: 'Whatsapp number of the user',
		type: String
	})
	whatsapp: string;

	@IsNotEmpty()
	@IsString()
	@ApiProperty({
		description: 'Security password of the user',
		type: String
	})
	password: string;

	@IsNumber()
	@IsNotEmpty()
	@ApiProperty({
		description: 'Country from where user live',
		type: String
	})
	promisedAmount: string;

	@IsDate()
	@IsOptional()
	@ApiProperty({
		description: 'Timestamp of last login',
		type: Date
	})
	lastLogin: string;

	@IsString()
	// @IsNotEmpty()
	@ApiProperty({
		description: 'Country from where user live',
		type: String
	})
	city: string;

	@IsString()
	@IsOptional()
	@ApiProperty({
		description: 'Role assigned to user',
		type: String
	})
	role: Role;
}