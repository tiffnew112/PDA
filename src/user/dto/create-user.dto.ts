import { IsEmail, IsOptional, IsString } from 'class-validator';
import { UserRole } from '../../generated/prisma/enums.js';

export class CreateUserDto {
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @IsString()
  password: string;
  @IsString()
  phone: string;
  @IsString()
  role: UserRole;
  @IsString()
  @IsOptional()
  refresh_token?: string;
}
