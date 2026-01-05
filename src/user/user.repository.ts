import { Injectable } from '@nestjs/common';
import { UserRole } from '../generated/prisma/enums.js';
import { PrismaService } from '../prisma/prisma.service.js';
import * as bcrypt from 'bcryptjs';
import { UpdateUserDto } from './dto/update-user.dto.js';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: {
    name: string;
    email: string;
    password: string;
    phone: string;
    role: UserRole;
  }) {
    const passwordHash = await bcrypt.hash(data.password, 10);
    return this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: passwordHash,
        phone: data.phone,
        role: data.role,
      },
    });
  }

  async findAll() {
    const user = await this.prisma.user.findMany();
    return user.map((item) => ({
      id: item.id,
      name: item.name,
      email: item.email,
      phone: item.phone,
      role: item.role,
    }));
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findFirst({ where: { id } });
    if (user) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...rest } = user;
      return rest;
    }
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  update(id: string, data: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  delete(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}
