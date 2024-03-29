import { Module } from '@nestjs/common';
import { ListingController } from './listing.controller';
import { ListingService } from './listing.service';
import { JwtService } from '@nestjs/jwt';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  controllers: [ListingController],
  providers: [ListingService, JwtService],
  imports: [CloudinaryModule]
})
export class ListingModule {}
