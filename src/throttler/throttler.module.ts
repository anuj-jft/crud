import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerConfigService } from 'src/config/throttler.config';
import { EnvModule } from 'src/env/env.module';

@Module({
	imports: [
		ThrottlerModule.forRootAsync({
			imports: [EnvModule],
			useClass: ThrottlerConfigService
		})
	]
})
export class ApiThrottlerModule {}
