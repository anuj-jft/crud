import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { dbConfigDto } from './dto/db-config.dto';
import { ThrottlerConfigDto } from './dto/throttler-config.dto';

@Injectable()
export class EnvService {
	constructor(private readonly configService: ConfigService) { }

	get dbConfig(): dbConfigDto {
		return new dbConfigDto(this.configService);
	}

	get throttlerConfig(): ThrottlerConfigDto {
		return new ThrottlerConfigDto(this.configService);
	}

	get jwtSecretKey(): string {
		return this.configService.get<string>('SECRET_KEY')
	}

	get applicationPort(): number {
		return this.configService.get<number>('PORT')
	}

}
