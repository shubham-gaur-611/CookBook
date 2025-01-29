import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body() body: { email: string; password: string }) {
    return await this.authService.register(body.email, body.password);
  }

  @Public()
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return await this.authService.validateUser(body.email, body.password);
  }
}
