import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';


@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() image: Express.Multer.File) {
    const result = await this.catalogService.saveImage(image);

    if (result) {
      return { success: true, message: 'Image uploaded successfully' };
    } else {
      return { success: false, message: 'Failed to upload image' };
    }
  }

  @Get('images')
  async getAllImages() {
    const images = await this.catalogService.getAllImages();
    return { success: true, data: images };
  }

  
}
