import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ListingModule } from './listing/listing.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    UserModule,
    ListingModule,
    AuthModule,
    PrismaModule,
    CloudinaryModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
