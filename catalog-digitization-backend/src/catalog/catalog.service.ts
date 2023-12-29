import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Express } from 'express';

@Injectable()
export class CatalogService {
  constructor(private readonly prismaService: PrismaService) {}

  async saveImage(image: Express.Multer.File): Promise<boolean> {
    try {
      const imageData = {
        name: image.originalname,
        data: image.buffer.toString('base64'),
      };

      await this.prismaService.images.create({
        data: imageData,
      });

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async getAllImages() {
    const images = await this.prismaService.images.findMany();
    return images;
  }

 
}
