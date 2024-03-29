import { Module } from '@nestjs/common';

import { ArticlesRouter } from '../articles/articles.router';
import { BenefitsRouter } from '../benefits/benefits.router';
import { BrandsRouter } from '../brands/brands.router';
import { ContactsRouter } from '../contacts/contacts.router';
import { GadgetsRouter } from '../gadgets/gadgets.router';
import { ImagesRouter } from '../images/images.router';
import { IssuesRouter } from '../issues/issues.router';
import { TrpcRouter } from './trpc.router';

import { GadgetsService } from '@domain/gadgets/gadgets.service';
import { JwtService } from '@nestjs/jwt';
import { ArticlesService } from '../articles/articles.service';
import { AuthRouter } from '../auth/auth.router';
import { AuthService } from '../auth/auth.service';
import { BenefitsService } from '../benefits/benefits.service';
import { BrandsService } from '../brands/brands.service';
import { ContactsService } from '../contacts/contacts.service';
import { ImagesService } from '../images/images.service';
import { IssuesService } from '../issues/issues.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UserRouter } from '../users/users.router';
import { UserService } from '../users/users.service';
import { TrpcService } from './trpc.service';

@Module({
  imports: [PrismaModule],
  providers: [
    TrpcService,
    TrpcRouter,
    GadgetsService,
    GadgetsRouter,
    IssuesService,
    IssuesRouter,
    BrandsService,
    BrandsRouter,
    BenefitsService,
    BenefitsRouter,
    ArticlesService,
    ArticlesRouter,
    ContactsService,
    ContactsRouter,
    ImagesService,
    ImagesRouter,
    UserService,
    UserRouter,
    AuthService,
    AuthRouter,
    JwtService,
  ],
  exports: [TrpcService],
})
export class TrpcModule {}
