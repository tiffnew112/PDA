import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service.js';
import { CreateUserDto } from 'src/user/dto/create-user.dto.js';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  register(data: CreateUserDto) {
    return this.userService.create(data);
  }

  //   validateUser(email:string, password:string){

  //   }
}
