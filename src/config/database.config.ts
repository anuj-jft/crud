import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { EnvService } from "./../env/env.service";
import { DataSourceOptions } from "typeorm";


@Injectable()
export class DatabaseConfigService implements TypeOrmOptionsFactory {
	constructor(private readonly envService: EnvService) { }
	createTypeOrmOptions(): TypeOrmModuleOptions {
		const dbConfig = this.envService.dbConfig;
		return {
			type: dbConfig.type as any,
			host: dbConfig.host,
			port: dbConfig.port,
			database: dbConfig.dbName,
			username: dbConfig.username,
			password: dbConfig.password,
			logging: dbConfig.logging,
			logger: dbConfig.logger as any,
			synchronize: dbConfig.syncronize || true,
			entities: ['dist/database/entities/*{.ts,.js}'],
			connectTimeout: dbConfig.connectionTimeOut,
			poolSize: dbConfig.poolSize,
			timezone: dbConfig.timezone,
			maxQueryExecutionTime: 2000,
			autoLoadEntities: true,
		}
	}
}