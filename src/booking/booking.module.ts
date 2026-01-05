import { Module } from '@nestjs/common';
import { BookingService } from './booking.service.js';
import { BookingController } from './booking.controller.js';
import { BookingRepository } from './booking.repository.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { UserModule } from '../user/user.module.js';
import { CoworkingSpaceModule } from '../coworking-space/coworking-space.module.js';

@Module({
  imports: [PrismaModule, UserModule, CoworkingSpaceModule],
  controllers: [BookingController],
  providers: [BookingService, BookingRepository],
  exports: [BookingService, BookingRepository],
})
export class BookingModule {}
