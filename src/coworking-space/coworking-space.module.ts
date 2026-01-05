import { Module } from '@nestjs/common';
import { CoworkingSpaceService } from './coworking-space.service.js';
import { CoworkingSpaceController } from './coworking-space.controller.js';
import { CoworkingSpaceRepository } from './coworking-space.repository.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { UserModule } from '../user/user.module.js';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [CoworkingSpaceController],
  providers: [CoworkingSpaceService, CoworkingSpaceRepository],
})
export class CoworkingSpaceModule {}
