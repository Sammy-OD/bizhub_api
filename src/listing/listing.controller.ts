import { Body, Controller, Delete, Get, HttpStatus, Param, ParseFilePipeBuilder, Patch, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { ListingService } from './listing.service';
import { GetUser } from 'src/auth/decorator';
import { CreateListingDto } from './dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('listings')
export class ListingController {
  constructor(private listingService: ListingService) {}

  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  createListing(@GetUser('id') userId: string, @UploadedFiles(
    new ParseFilePipeBuilder()
      .addFileTypeValidator({fileType: 'image/*'})
      .addMaxSizeValidator({maxSize: 5000 * 1024})
      .build({errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY})
  ) images: Array<Express.Multer.File>, @Body() dto: CreateListingDto) {
    return this.listingService.createListing(userId, images, dto);
  }

  @Get()
  getListings() {
    return this.listingService.getListings();
  }

  @Get(':id')
  getListingById(@Param('id') listingId: string) {
    return this.listingService.getListingById(listingId);
  }

  @Patch()
  editListingById() {}

  @Delete()
  deleteListingById() {}
}
