import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDto, RegisterUserDto } from '../user.dto';
import { UserService } from '../user.service';

@Controller('users/auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async createUser(@Body() registerUserDto: RegisterUserDto): Promise<void> {
    return this.userService.registerUser(registerUserDto);
  }

  @Post('login')
  async loginUser(@Body() loginUserDto: LoginUserDto): Promise<void> {
    return this.userService.loginUser(loginUserDto);
  }
}
