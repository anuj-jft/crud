import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { EnvService } from "./../env/env.service";


@Injectable()
export class DatabaseConfigService implements TypeOrmOptionsFactory {
	constructor(private readonly envService: EnvService) { }
	createTypeOrmOptions(): TypeOrmModuleOptions {
		return {
			type: "mysql",
			host: "mysql-8df05ff-rsf-india.a.aivencloud.com",
			port: 14450,
			database: "defaultdb",
			username: "avnadmin",
			password: "AVNS_CkjxJO3cQghii3MxMSR",
			synchronize:  true,
			entities: ['dist/database/entities/*{.ts,.js}'],
		}
	}
}
