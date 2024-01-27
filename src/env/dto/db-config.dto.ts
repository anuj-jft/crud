import { ConfigService } from '@nestjs/config';
import { LoggerOptions } from "typeorm"
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions"


export class dbConfigDto {
	type: MysqlConnectionOptions;
	host: string;
	port: number;
	dbName: string;
	username: string;
	password: string;
	syncronize: boolean;
	logging: LoggerOptions;
	logger: MysqlConnectionOptions;
	connectionTimeOut: number;
	poolSize: number;
	timezone: string

	constructor(configService: ConfigService) {
		this.type = configService.get('DATABASE_TYPE', { infer: true });
		this.host = configService.get<string>('DATABASE_SERVER');
		this.port = configService.get<number>('DATABASE_PORT');
		this.dbName = configService.get<string>('DATABASE_NAME');
		this.username = configService.get<string>('DATABASE_USER');
		this.password = configService.get<string>('DATABASE_PASSWORD');
		this.syncronize = configService.get<boolean>('SYNCHRONIZE') || true;
		this.logging = configService.get<LoggerOptions>('LOGGING', { infer: true });
		this.logger = configService.get<MysqlConnectionOptions>('LOGGER', { infer: true });
		this.connectionTimeOut = configService.get<number>('DATABASE_TIMEOUT') || 60000;
		this.poolSize = configService.get<number>('DATABASE_POOL_SIZE') || 0;
		this.timezone = 'local'
	}
}