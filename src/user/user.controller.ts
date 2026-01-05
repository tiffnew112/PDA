import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { JwtAuthGuard } from '../auth/jwt.auth-guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import type { reqProp } from '../common/types/types.js';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @Roles('PROVIDER', 'USER')
  getProfile(@Req() req: { user: reqProp }) {
    return this.userService.findOne(req.user.userId);
  }

  @Get()
  @Roles('ADMIN')
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @Roles('ADMIN')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: { user: reqProp },
  ) {
    return this.userService.update(id, updateUserDto, req.user.userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: { user: reqProp }) {
    return this.userService.remove(id, req.user);
  }
}
