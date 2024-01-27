import { Module } from '@nestjs/common';
import { UtilsService } from './utils.service';
import { EnvModule } from 'src/env/env.module';

@Module({
  imports: [EnvModule],
  providers: [UtilsService],
  exports: [UtilsService]
})
export class UtilsModule { }
