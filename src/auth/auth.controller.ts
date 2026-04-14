import { Controller, Post, Body, HttpCode} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  create(@Body() login: LoginUserDto) {
    return this.authService.login(login);
  }

}
