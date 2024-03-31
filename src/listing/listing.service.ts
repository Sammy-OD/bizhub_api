import { Injectable } from '@nestjs/common';
import { CreateListingDto } from './dto';
import { PrismaService } from '@src/prisma/prisma.service';
import { CloudinaryService } from '@src/cloudinary/cloudinary.service';

@Injectable()
export class ListingService {
  constructor(private prisma: PrismaService, private cloudinary: CloudinaryService) {}

  async createListing(userId: string, images: Array<Express.Multer.File>, dto: CreateListingDto) {
    const imageUrls: string[] = [];

    for (const image of images) {
      const res = await this.cloudinary.uploadImage(image);
      imageUrls.push(res.secure_url);
    }

    const listing = await this.prisma.listing.create({
      data: {
        userId,
        ...dto,
        imageUrls
      }
    });

    return listing;
  }

  async getListings() {
    return await this.prisma.listing.findMany();
  }

  async getListingById(listingId: string) {
    const listing =  await this.prisma.listing.findUnique({
      where: {
        id: listingId
      },
      include: {user: true}
    })

    delete listing.user.password;

    return listing;
  }

  editListingById() {}

  deleteListingById() {}
}