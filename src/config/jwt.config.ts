import { JwtModuleOptions } from '@nestjs/jwt';
import { EnvService } from "src/env/env.service";


export const jwtConfig = (envService: EnvService): JwtModuleOptions => {
	return {
		global: true,
		secret: envService.jwtSecretKey,
		signOptions: { expiresIn: '3h' }
	}
}