import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateBookingDto } from './dto/create-booking.dto.js';
import { UpdateBookingDto } from './dto/update-booking.dto.js';

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

  findAll() {
    return this.prisma.booking.findMany();
  }

  findOne(id: string) {
    return this.prisma.booking.findUnique({
      where: { id },
    });
  }

  findUnavailableBookings(coworkingSpaceId: string) {
    return this.prisma.booking.findMany({
      where: { coworkingSpaceId },
      select: { startTime: true, endTime: true },
    });
  }

  update(id: string, data: UpdateBookingDto) {
    return this.prisma.booking.update({
      where: { id },
      data,
    });
  }

  delete(id: string) {
    return this.prisma.booking.delete({
      where: { id },
    });
  }
}
