import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { DataSource } from "typeorm";
import { User } from "./database/entities/User.entity";
import { UserTypes } from "./database/enums/user-type.enum";
import { Role } from "./database/entities/Role.entity";



@Injectable()
export class AppService implements OnApplicationBootstrap {
	constructor(private dataSource: DataSource) { }

	async onApplicationBootstrap(): Promise<void> {
		let adminRole = await this.dataSource.getRepository(Role).findOne({ where: { role: UserTypes.ADMIN } });
		if (!adminRole) {
			adminRole = this.dataSource.getRepository(Role).create();
			adminRole.role = UserTypes.ADMIN;
			adminRole = await this.dataSource.getRepository(Role).save(adminRole);
		}
		let superAdmin = await this.dataSource.getRepository(User).findOne({ where: { email: 'shipu1413@gmail.com' } });
		if (!superAdmin) {
			let superAdmin = new User();
			superAdmin.fname = 'Anuj';
			superAdmin.lname = 'Kumar Singh';
			superAdmin.email = 'shipu1413@gmail.com';
			superAdmin.mobile = '7905910944';
			superAdmin.role = adminRole;
			superAdmin.password = '12345678';
			superAdmin.whatsapp = '7905910944';
			superAdmin.city = 'varanasi';
			superAdmin = await this.dataSource.getRepository(User).save(superAdmin);
		}
	}
}