import { Module } from '@nestjs/common';
import { EnvService } from './env.service';
import { ConfigModule } from '@nestjs/config';
import { envConfig } from 'src/config/env.config';

@Module({
  imports: [ConfigModule.forRoot(envConfig)],
  providers: [EnvService],
  exports: [EnvService]
})
export class EnvModule { }
