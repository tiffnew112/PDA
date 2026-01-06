import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateCoworkingSpaceDto } from './dto/create-coworking-space.dto.js';
import { UpdateCoworkingSpaceDto } from './dto/update-coworking-space.dto.js';

@Injectable()
export class CoworkingSpaceRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateCoworkingSpaceDto, userId: string) {
    return this.prisma.coworkingSpace.create({
      data: {
        ...data,
        ownerId: userId,
      },
    });
  }

  async getWorkspacesByUserId(id: string) {
    const result = await this.prisma.user.findUnique({
      where: { id },
      include: { coworkingSpaces: true },
    });
    return result;
  }

  findAll() {
    return this.prisma.coworkingSpace.findMany();
  }

  findOne(id: string) {
    return this.prisma.coworkingSpace.findUnique({ where: { id } });
  }

  findAllUnverified() {
    return this.prisma.coworkingSpace.findMany({
      where: { isVerified: false },
    });
  }

  update(id: string, data: UpdateCoworkingSpaceDto) {
    return this.prisma.coworkingSpace.update({
      where: { id },
      data,
    });
  }

  delete(id: string) {
    return this.prisma.coworkingSpace.delete({ where: { id } });
  }

  verifyCoworkingSpace(id: string) {
    return this.prisma.coworkingSpace.update({
      where: { id },
      data: { isVerified: true },
    });
  }
}
