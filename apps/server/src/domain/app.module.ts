import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ImagesModule } from './images/images.module';
import { NotificationsModule } from './notifications/notifications.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { TrpcModule } from './trpc/trpc.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    TrpcModule,
    ImagesModule,
    NotificationsModule
  ],
  providers: [PrismaService]
})
export class AppModule {}
