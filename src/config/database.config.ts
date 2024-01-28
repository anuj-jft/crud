import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { EnvService } from "./../env/env.service";


@Injectable()
export class DatabaseConfigService implements TypeOrmOptionsFactory {
	constructor(private readonly envService: EnvService) { }
	createTypeOrmOptions(): TypeOrmModuleOptions {
		return {
			type: "mysql",
			host: "localhost",
			port: 3306,
			database: "rsfindia",
			username: "phpmyadmin",
			password: "123456789",
			synchronize:  true,
			entities: ['dist/database/entities/*{.ts,.js}'],
		}
	}
}
