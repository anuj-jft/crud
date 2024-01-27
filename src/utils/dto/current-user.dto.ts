import { User } from "./../../database/entities/User.entity";

export class CurrentUserDto {
	id: string;
	fname: string;
	lname: string;
	email: string;
	role: string;

	constructor(user: User) {
		this.id = user.id;
		this.fname = user.fname;
		this.lname = user.lname;
		this.email = user.email;
		this.role = user.role.role;
	}
}