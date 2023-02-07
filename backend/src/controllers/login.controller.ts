import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { LoginService } from '../services/login.service';
import LoginResponse from 'src/models/response/login.dto';
import LoginRequest from 'src/models/request/login.dto';
import LogoutResponse from 'src/models/response/logout.dto';

@Controller('/api')
export class LoginController {
  constructor(private readonly appService: LoginService) {}

  @Post('/login')
  login(@Body() body: LoginRequest): Promise<LoginResponse> {
    return null;
  }

  @Post('/logout')
  logout(): Promise<LogoutResponse> {
    return null;
  }
}
