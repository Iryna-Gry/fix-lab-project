import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { BenefitsModule } from './benefits/benefits.module';
import { BrandsModule } from './brands/brands.module';
import { ContactsModule } from './contacts/contacts.module';
import { GadgetsModule } from './gadgets/gadgets.module';
import { ImagesModule } from './images/images.module';
import { IssuesModule } from './issues/issues.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGO_DB_LINK'),
        dbName: config.get<string>('MONGO_DB_NAME'),
        auth: {
          username: config.get<string>('MONGO_DB_AUTH_USERNAME'),
          password: config.get<string>('MONGO_DB_AUTH_PASSWORD')
        }
      })
    }),
    UsersModule,
    AuthModule,
    GadgetsModule,
    IssuesModule,
    BenefitsModule,
    BrandsModule,
    ContactsModule,
    ImagesModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}