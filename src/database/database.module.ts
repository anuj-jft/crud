import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigService } from 'src/config/database.config';
import { EnvModule } from 'src/env/env.module';

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			imports: [EnvModule],
			useClass: DatabaseConfigService,
		})
	]
})
export class DatabaseModule { }
