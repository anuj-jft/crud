import { ConfigModuleOptions } from '@nestjs/config';
// import { validate } from './env.validation';

export const envConfig: ConfigModuleOptions = {
	cache: true,
	isGlobal: false,
	// validate,
};
