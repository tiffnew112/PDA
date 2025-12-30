import { IsEmail, IsString } from 'class-validator';
import { UserRole } from '../../generated/prisma/enums.js';

export class CreateUserDto {
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @IsString()
  password: string;

  phone: string;
  @IsString()
  role: UserRole;
}
