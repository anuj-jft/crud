import { Module } from '@nestjs/common';
import { EnvModule } from './env/env.module';
import { DatabaseModule } from './database/database.module';
import { ApiThrottlerModule } from './throttler/throttler.module';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UtilsModule } from './utils/utils.module';
import { UserSubscriber } from './subscriber/user.subscriber';
import { DonationModule } from './donation/donation.module';

@Module({
  imports: [EnvModule, DatabaseModule, ApiThrottlerModule, AuthModule, UsersModule, UtilsModule, DonationModule],
  controllers: [],
  providers: [AppService, UserSubscriber],
})
export class AppModule { }
