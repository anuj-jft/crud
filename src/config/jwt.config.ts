import { JwtModuleOptions } from '@nestjs/jwt';
import { EnvService } from "src/env/env.service";


export const jwtConfig = (envService: EnvService): JwtModuleOptions => {
	return {
		global: true,
		secret: "sdahadhkadfsuiweuidshj",
		signOptions: { expiresIn: '3h' }
	}
}
