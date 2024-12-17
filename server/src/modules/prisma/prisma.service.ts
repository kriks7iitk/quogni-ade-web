// prisma.service.ts

import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  // Transaction wrapper function
  async withTransaction<T>(
    operations: (client: PrismaService) => Promise<T>,
    prismaClient?: PrismaService, // Optional Prisma client
  ): Promise<T> {
    const prisma = prismaClient || this; // Use the provided client or default to `this` (PrismaService)

    if (prismaClient) {
      // If an existing Prisma client is provided, run the operations directly without a new transaction
      return await operations(prismaClient);
    } else {
      // Otherwise, run the operations within a new transaction using `this` service
      return await prisma.$transaction(async (client: PrismaService) => {
        return await operations(client);
      });
    }
  }
}
