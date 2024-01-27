import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { EnvModule } from 'src/env/env.module';
import { EnvService } from 'src/env/env.service';
import { jwtConfig } from 'src/config/jwt.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/entities/User.entity';
import { Role } from 'src/database/entities/Role.entity';
import { UtilsModule } from 'src/utils/utils.module';
import { PaytmChecksum } from './paytmchecksum.service';

@Module({
  imports: [UsersModule, JwtModule.registerAsync({
    imports: [EnvModule],
    inject: [EnvService],
    global: true,
    useFactory: (envService: EnvService): JwtModuleOptions =>
      jwtConfig(envService),
  }), TypeOrmModule.forFeature([User, Role]),
    UtilsModule
  ],
  controllers: [AuthController],
  providers: [AuthService, PaytmChecksum]
})
export class AuthModule { }
