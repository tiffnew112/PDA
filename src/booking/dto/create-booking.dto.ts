import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';
import { IsStartBeforeEnd } from '../../common/decorators/dates.decorator.js';

export class CreateBookingDto {
  @Type(() => Date)
  @IsDate()
  @IsStartBeforeEnd({ message: 'startTime must be before endTime' })
  startTime: Date;

  @Type(() => Date)
  @IsDate()
  endTime: Date;

  @IsNumber()
  totalPrice: number;

  @IsString()
  coworkingSpaceId: string;
}
