import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('users/auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async registerUser(@Body() registerUserDto: RegisterUserDto): Promise<void> {
    return this.userService.registerUser(registerUserDto);
  }
}
