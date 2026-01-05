import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateBookingDto } from './dto/create-booking.dto.js';

@Injectable()
export class BookingRepository {
  constructor(private readonly prisma: PrismaService) {}

  createBooking(data: CreateBookingDto, userId: string) {
    return this.prisma.booking.create({
      data: {
        startTime: data.startTime,
        endTime: data.endTime,
        totalPrice: data.totalPrice,
        user: {
          connect: { id: userId },
        },
        coworkingSpace: { connect: { id: data.coworkingSpaceId } },
      },
    });
  }
}
