import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { LoginService } from 'src/services/login.service';
import LoginResponse, { LoginToken } from 'src/models/response/login.dto';
import LoginRequest from 'src/models/request/login.dto';
import LogoutResponse from 'src/models/response/logout.dto';

@Controller('/api')
export class LoginController {
  constructor(private readonly appService: LoginService) {}

  @Post('/login')
  login(@Body() body: LoginRequest): Promise<LoginResponse> {
    return this.appService.login(body);
  }

  @Post('/logout')
  logout(): Promise<LogoutResponse> {
    return null;
  }

  @Get('/callback')
  callback(@Query() query: { code: string }): Promise<LoginToken> {
    const work = async () => {
      return {
        access_token: query.code,
        expire_time: Date.now(),
      };
    };
    return work();
  }
}
