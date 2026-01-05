import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { UserRepository } from './user.repository.js';
import { UserRole } from '../generated/prisma/enums.js';

@Injectable()
export class UserService {
  constructor(private readonly repo: UserRepository) {}

  async findAll() {
    const user = await this.repo.findAll();
    if (!user) {
      throw new NotFoundException('Users not found');
    }
    return user;
  }

  async findOne(id: string) {
    const user = await this.repo.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.repo.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto, userId: string) {
    const user = await this.repo.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.id !== userId) {
      throw new ForbiddenException('You are not allowed to update this user');
    }
    return this.repo.update(id, updateUserDto);
  }

  async remove(id: string, data: { userId: string; role: UserRole }) {
    const user = await this.repo.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.id !== data.userId && data.role !== UserRole.ADMIN) {
      throw new ForbiddenException('You are not allowed to delete this user');
    }
    return this.repo.delete(id);
  }
}
