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
  Query,
} from '@nestjs/common';
import { CoworkingSpaceService } from './coworking-space.service.js';
import { CreateCoworkingSpaceDto } from './dto/create-coworking-space.dto.js';
import { UpdateCoworkingSpaceDto } from './dto/update-coworking-space.dto.js';
import { JwtAuthGuard } from '../auth/jwt.auth-guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import type { reqProp } from '../common/types/types.js';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('coworking-space')
export class CoworkingSpaceController {
  constructor(private readonly coworkingSpaceService: CoworkingSpaceService) {}

  @Post()
  @Roles('PROVIDER')
  create(
    @Body() createCoworkingSpaceDto: CreateCoworkingSpaceDto,
    @Req() req: { user: reqProp },
  ) {
    return this.coworkingSpaceService.create(createCoworkingSpaceDto, req.user);
  }

  @Get('unverified')
  @Roles('ADMIN')
  findAllNotVerified() {
    return this.coworkingSpaceService.findAllUnverified();
  }

  @Get('verified')
  @Roles('USER')
  findAllVerified() {
    return this.coworkingSpaceService.findAllVerified();
  }

  @Get('search')
  @Roles('USER', 'PROVIDER', 'ADMIN')
  findByQuery(
    @Query('name') name: string,
    @Query('location') location: string,
  ) {
    return this.coworkingSpaceService.findCoworkingSpaceByQuery(name, location);
  }

  @Get()
  @Roles('ADMIN')
  findAll() {
    return this.coworkingSpaceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coworkingSpaceService.findOne(id);
  }

  @Get('user/:id')
  @Roles('PROVIDER')
  getWorkspacesByUserId(@Param('id') id: string) {
    return this.coworkingSpaceService.getWorkspacesByUserId(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCoworkingSpaceDto: UpdateCoworkingSpaceDto,
    @Req() req: { user: reqProp },
  ) {
    return this.coworkingSpaceService.update(
      id,
      updateCoworkingSpaceDto,
      req.user,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: { user: reqProp }) {
    return this.coworkingSpaceService.remove(id, req.user);
  }

  @Patch('verify/:id')
  @Roles('ADMIN')
  verifyCoworkingSpace(@Param('id') id: string) {
    return this.coworkingSpaceService.verifyCoworkingSpace(id);
  }
}
