import { Injectable, OnModuleInit, OnApplicationShutdown } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService implements OnModuleInit, OnApplicationShutdown {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async onModuleInit() {
    await this.prisma.$connect();
  }

  async onApplicationShutdown() {
    await this.prisma?.$disconnect();
  }

  // Add a property for the 'images' model
  images = {
    create: (params: { data: { name: string; data: string } }) =>
      this.prisma?.image.create(params),
    findMany: () => this.prisma?.image.findMany(),
  };


}
