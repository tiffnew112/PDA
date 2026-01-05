import { PartialType } from '@nestjs/mapped-types';
import { CreateCoworkingSpaceDto } from './create-coworking-space.dto.js';

export class UpdateCoworkingSpaceDto extends PartialType(
  CreateCoworkingSpaceDto,
) {}
