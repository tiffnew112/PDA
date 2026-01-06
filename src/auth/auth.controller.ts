import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto.js';
import { AuthService } from './auth.service.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() data: CreateUserDto) {
    return this.authService.register(data);
  }

  @Post('login')
  login(@Body() data: { email: string; password: string }) {
    console.log(process.env.DATABASE_URL);
    return this.authService.userLogin(data.email, data.password);
  }

  @Post('refresh')
  refresh(@Body() data: { id: string; token: string }) {
    return this.authService.refreshToken(data.id, data.token);
  }
}
