import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { getMongoDBConfig } from './config/mongo.config';
import { OrganizationModule } from './organization/organization.module';
import { UserModule } from './user/user.module';
import { WorkshopModule } from './workshop/workshop.module';
import { MagazineModule } from './magazine/magazine.module';
import { LokomotiveModule } from './lokomotive/lokomotive.module';
import { InstrumentModule } from './instrument/instrument.module';
import { ReportModule } from './report/report.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoDBConfig,
    }),
    OrganizationModule,
    UserModule,
    AuthModule,
    WorkshopModule,
    MagazineModule,
    LokomotiveModule,
    InstrumentModule,
    ReportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// bestprogrammist
// W3FMpMCkCljnpp6D
