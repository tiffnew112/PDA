import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { BookingService } from './booking.service.js';
import { CreateBookingDto } from './dto/create-booking.dto.js';
import { UpdateBookingDto } from './dto/update-booking.dto.js';
import { JwtAuthGuard } from '../auth/jwt.auth-guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { reqProp } from '../common/types/types.js';
import { Roles } from '../common/decorators/roles.decorator.js';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  create(
    @Body() createBookingDto: CreateBookingDto,
    @Req() req: { user: reqProp },
  ) {
    return this.bookingService.create(createBookingDto, req.user);
  }

  @Get('me')
  @Roles('USER')
  findAllMyBookings(@Req() req: { user: reqProp }) {
    return this.bookingService.findAllMyBookings(req.user.userId);
  }

  @Get()
  @Roles('ADMIN')
  findAll() {
    return this.bookingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: { user: reqProp }) {
    return this.bookingService.findOne(id, req.user);
  }

  @Get('unavailable/:coworkingSpaceId')
  findUnavailableBookings(@Param('coworkingSpaceId') coworkingSpaceId: string) {
    return this.bookingService.findUnavailableBookings(coworkingSpaceId);
  }

  @Get('space/:id')
  findBySpaceId(
    @Param('id') coworkingSpaceId: string,
    @Req() req: { user: reqProp },
  ) {
    return this.bookingService.findByUserAndSpace(req.user, coworkingSpaceId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBookingDto: UpdateBookingDto,
    @Req() req: { user: reqProp },
  ) {
    return this.bookingService.update(id, updateBookingDto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: { user: reqProp }) {
    return this.bookingService.remove(id, req.user);
  }
}
