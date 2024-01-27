import { JwtService } from '@nestjs/jwt';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { User } from './../database/entities/User.entity';
import { CurrentUserDto } from './dto/current-user.dto';
import { EnvService } from './../env/env.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UtilsService {
	constructor(private jwtService: JwtService, private envService: EnvService) { }
	async jwtToken(user: User): Promise<string> {
		return await this.jwtService.signAsync({ ...instanceToPlain(new CurrentUserDto(user)) });
	}

	verifyToken(token: string): CurrentUserDto {
		try {
			return this.jwtService.verify(token, {
				secret: this.envService.jwtSecretKey
			});
		} catch (err) {
			throw new ForbiddenException(err);
		}
	}

	async encryptPassword(password: string): Promise<string> {
		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(password, saltRounds);
		return hashedPassword;
	}

	async comparePasswords(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
		return bcrypt.compare(plainTextPassword, hashedPassword);
	}
}
