import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { ResponseMessage } from 'src/response-message.decorator';
import { UserRequest } from 'src/types/UserRequest';
import { Public } from './auth.decorator';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Login successful')
  @Post('login')
  async signIn(@Body() signInDto: { username: string; password: string }) {
    const token = await this.authService.signIn(
      signInDto.username,
      signInDto.password,
    );

    return {
      token,
    };
  }

  @Get('profile')
  getProfile(@Request() req: UserRequest) {
    return req.user;
  }

  @Post('logout')
  @ResponseMessage('Session cleaned')
  logout() {}
}
