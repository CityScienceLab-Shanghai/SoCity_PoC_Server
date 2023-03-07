import { ClockController } from './controllers/clock.controller';
import { TransportationController } from './controllers/transportation.controller';
import { ProfileController } from './controllers/profile.controller';
import { VerificationController } from './controllers/verification.controller';
import { CaptchaService } from './services/captcha.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoginController } from './controllers/login.controller';
import { RegisterController } from './controllers/register.controller';
import { CaptchaController } from './controllers/captcha.controller';

import { ContractController } from './controllers/contract.controller';

import { LoginService } from './services/login.service';
import { RegisterService } from './services/register.service';

import User from './models/persistence/user.entity';
import DistanceIncrement from './models/persistence/distance_increment.entity';
import TransportationRecord from './models/persistence/transportation_record.entity';

import { VerificationService } from './services/verification.service';
import { ProfileService } from './services/profile.service';
import { TransportationService } from './services/transportation.service';
import { ClockService } from './services/clock.service';
import { AuthorizationService } from './services/authorization.service';
import { ContractService } from './services/contract.service';

const configuration = () => ({
  casdoorEndpoint: 'casdoor:8884',
  casdoorClientId: process.env.CASDOOR_CLIENT_ID,
  casdoorClientSecret: process.env.CASDOOR_CLIENT_SECRET,
  casdoorCertificate: process.env.CASDOOR_CERTIFICATE,
  casdoorOrgName: process.env.CASDOOR_ORG_NAME,
  casdoorAppName: process.env.CASDOOR_APP_NAME,
  env: process.env.NODE_ENV,
});

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User, TransportationRecord, DistanceIncrement],
      ssl: false,
      synchronize: false,
    }),
    TypeOrmModule.forFeature([User, TransportationRecord, DistanceIncrement]),
  ],
  controllers: [
    LoginController,
    RegisterController,
    CaptchaController,
    VerificationController,
    ProfileController,
    TransportationController,
    ClockController,
    ContractController,
  ],
  providers: [
    LoginService,
    RegisterService,
    CaptchaService,
    VerificationService,
    ProfileService,
    TransportationService,
    ClockService,
    AuthorizationService,
    ContractService,
  ],
})
export class AppModule {}
