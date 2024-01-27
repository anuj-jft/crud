import { ConfigService } from "@nestjs/config";

export class ThrottlerConfigDto {
	limit: number;
	ttl: number;

	constructor(configService: ConfigService) {
		this.limit = configService.get<number>('THROTTLE_LIMIT');
		this.ttl = configService.get<number>('THROTTLE_TTL')
	}
}