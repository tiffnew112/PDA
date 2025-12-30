import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UserService } from '../user/user.service.js';
import { CreateUserDto } from '../user/dto/create-user.dto.js';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  register(data: CreateUserDto) {
    return this.userService.create(data);
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }
    return null;
  }

  async login(user: { userId: string; email: string; role: string }) {
    const payload = { sub: user.userId, email: user.email, role: user.role };

    const { access_token, refresh_token, hashedRt } =
      await this.generateToken(payload);

    await this.userService.update(user.userId, { refresh_token: hashedRt });

    return {
      access_token,
      refresh_token,
    };
  }

  async userLogin(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) throw new BadRequestException('Email or password invalid');

    return this.login({
      email,
      userId: user.id,
      role: user.role,
    });
  }

  async refreshToken(userId: string, token: string) {
    const user = await this.userService.findOne(userId);
    if (!user || !user.refresh_token)
      throw new BadRequestException('Account not found');

    const rtMatches = await bcrypt.compare(token, user.refresh_token);
    if (!rtMatches) throw new ForbiddenException('Refresh Token didnt match');

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const { refresh_token, access_token, hashedRt } =
      await this.generateToken(payload);

    await this.userService.update(user.id, { refresh_token: hashedRt });

    return {
      access_token,
      refresh_token,
    };
  }

  async generateToken(payload: { sub: string; email: string; role: string }) {
    const access_token = this.jwtService.sign(payload, { expiresIn: '2h' });
    const refresh_token = this.jwtService.sign(payload, { expiresIn: '7d' });
    const hashedRt = await bcrypt.hash(refresh_token, 10);
    return { access_token, refresh_token, hashedRt };
  }
}
