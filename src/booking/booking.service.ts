import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto.js';
import { UpdateBookingDto } from './dto/update-booking.dto.js';
import { UserRepository } from '../user/user.repository.js';
import { BookingRepository } from './booking.repository.js';
import { CoworkingSpaceRepository } from '../coworking-space/coworking-space.repository.js';

@Injectable()
export class BookingService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly coworkingSpaceRepo: CoworkingSpaceRepository,
    private readonly repo: BookingRepository,
  ) {}
  async create(
    createBookingDto: CreateBookingDto,
    user: { userId: string; role: string },
  ) {
    const checkUser = await this.userRepo.findOne(user.userId);
    if (!checkUser) {
      throw new NotFoundException('User not found');
    }
    const checkCoworkingSpace = await this.coworkingSpaceRepo.findOne(
      createBookingDto.coworkingSpaceId,
    );
    if (!checkCoworkingSpace) {
      throw new NotFoundException('Coworking space not found');
    }
    if (user.role !== 'USER') {
      throw new BadRequestException(
        'Only users with USER role can create bookings',
      );
    }
    return this.repo.createBooking(createBookingDto, user.userId);
  }

  findAll() {
    return `This action returns all booking`;
  }

  findOne(id: number) {
    return `This action returns a #${id} booking`;
  }

  update(id: number, updateBookingDto: UpdateBookingDto) {
    return `This action updates a #${id} booking`;
  }

  remove(id: number) {
    return `This action removes a #${id} booking`;
  }
}
