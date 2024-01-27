import { Injectable } from '@nestjs/common';
import {ThrottlerOptionsFactory} from '@nestjs/throttler';
import { EnvService } from '../env/env.service';

@Injectable()
export class ThrottlerConfigService implements ThrottlerOptionsFactory {
	constructor(private readonly envService: EnvService) { }

	createThrottlerOptions(): any {
		return this.envService.throttlerConfig;
	}
}
